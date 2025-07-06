import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateFavoriteDto } from "./dto/create-favorite.dto";
import { UpdateFavoriteDto } from "./dto/update-favorite.dto";
import { Favorite } from "./models/favorite.model";
import { User } from "../users/models/user.model";
import { Restaurant } from "../restaurants/models/restaurant.model";

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorite) private favoriteModel: typeof Favorite,
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Restaurant) private restaurantModel: typeof Restaurant
  ) {}

  async create(createFavoriteDto: CreateFavoriteDto) {
    const { userId, restaurantId } = createFavoriteDto;

    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException(`Foydalanuvchi topilmadi: ID ${userId}`);
    }

    const restaurant = await this.restaurantModel.findByPk(restaurantId);
    if (!restaurant) {
      throw new NotFoundException(`Restoran topilmadi: ID ${restaurantId}`);
    }

    const favorite = await this.favoriteModel.create(createFavoriteDto);
    return favorite;
  }

  async findAll() {
    return this.favoriteModel.findAll({
      include: [User, Restaurant],
    });
  }

  async findOne(id: number) {
    const favorite = await this.favoriteModel.findByPk(id, {
      include: [User, Restaurant],
    });
    if (!favorite) {
      throw new NotFoundException(`Sevimli topilmadi: ID ${id}`);
    }
    return favorite;
  }

  async update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    const favorite = await this.favoriteModel.findByPk(id);
    if (!favorite) {
      throw new NotFoundException(`Sevimli topilmadi: ID ${id}`);
    }
    return favorite.update(updateFavoriteDto);
  }

  async remove(id: number) {
    const favorite = await this.favoriteModel.findByPk(id);
    if (!favorite) {
      throw new NotFoundException(`Sevimli topilmadi: ID ${id}`);
    }
    await favorite.destroy();
    return { message: `Sevimli o‘chirildi: ID ${id}` };
  }
}
