import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Restaurant } from "./models/restaurant.model";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant)
    private restaurantModel: typeof Restaurant
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    try {
      const newRestaurant =
        await this.restaurantModel.create(createRestaurantDto);
      return newRestaurant;
    } catch (err) {
      throw new BadRequestException("Restaurant yaratishda xatolik yuz berdi");
    }
  }

  async findAll(): Promise<Restaurant[]> {
    return this.restaurantModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Restaurant> {
    const restaurant = await this.restaurantModel.findByPk(id, {
      include: { all: true },
    });
    if (!restaurant) {
      throw new NotFoundException("Restaurant topilmadi");
    }
    return restaurant;
  }

  async update(
    id: number,
    updateRestaurantDto: UpdateRestaurantDto
  ): Promise<Restaurant> {
    const restaurant = await this.findOne(id);
    return restaurant.update(updateRestaurantDto);
  }

  async remove(id: number): Promise<{ message: string }> {
    const restaurant = await this.findOne(id);
    await restaurant.destroy();
    return { message: "Restaurant muvaffaqiyatli o‘chirildi" };
  }
}
