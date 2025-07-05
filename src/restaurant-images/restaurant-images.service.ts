import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { RestaurantImage } from "./models/restaurant-image.model";
import { CreateRestaurantImageDto } from "./dto/create-restaurant-image.dto";
import { UpdateRestaurantImageDto } from "./dto/update-restaurant-image.dto";
import { Restaurant } from "../restaurants/models/restaurant.model";

@Injectable()
export class RestaurantImagesService {
  constructor(
    @InjectModel(RestaurantImage)
    private restaurantImageModel: typeof RestaurantImage,

    @InjectModel(Restaurant)
    private restaurantModel: typeof Restaurant
  ) {}

  async create(dto: CreateRestaurantImageDto) {
    const restaurant = await this.restaurantModel.findByPk(dto.restaurantId);
    if (!restaurant) {
      throw new NotFoundException("Bunday restoran topilmadi");
    }

    const existingImage = await this.restaurantImageModel.findOne({
      where: { imageUrl: dto.imageUrl },
    });
    if (existingImage) {
      throw new BadRequestException("Bu rasm URL allaqachon mavjud");
    }

    return this.restaurantImageModel.create(dto);
  }

  async findAll() {
    return this.restaurantImageModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const image = await this.restaurantImageModel.findByPk(id, {
      include: { all: true },
    });
    if (!image) {
      throw new NotFoundException("Rasm topilmadi");
    }
    return image;
  }

  async update(id: number, dto: UpdateRestaurantImageDto) {
    const image = await this.restaurantImageModel.findByPk(id);
    if (!image) {
      throw new NotFoundException("Yangilamoqchi bo‘lgan rasm topilmadi");
    }

    if (dto.restaurantId) {
      const restaurant = await this.restaurantModel.findByPk(dto.restaurantId);
      if (!restaurant) {
        throw new NotFoundException("Berilgan restaurantId mavjud emas");
      }
    }

    await image.update(dto);
    return image;
  }

  async remove(id: number) {
    const image = await this.restaurantImageModel.findByPk(id);
    if (!image) {
      throw new NotFoundException("O‘chirilmoqchi bo‘lgan rasm topilmadi");
    }
    await image.destroy();
    return { message: "Rasm muvaffaqiyatli o‘chirildi" };
  }
}
