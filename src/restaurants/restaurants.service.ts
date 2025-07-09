import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Restaurant } from "./models/restaurant.model";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";
import { OpeningSchedule } from "../opening-schedules/models/opening-schedule.model";
import { Tables } from "../tables/models/table.model";
import { User } from "../users/models/user.model";
import { Reservation } from "../reservation/models/reservation.model";
import { Payment } from "../payments/models/payment.model";
import { Announcement } from "../announcements/models/announcement.model";
import { District } from "../district/models/district.model";
import { Review } from "../reviews/models/review.model";
import { RestaurantImage } from "../restaurant-images/models/restaurant-image.model";
import { MenuCategory } from "../menu-categories/models/menu-category.model";

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
      console.error("Restaurant yaratishda xatolik:", err);
      throw new BadRequestException("Restaurant yaratishda xatolik yuz berdi");
    }
  }

  async findAll(): Promise<Restaurant[]> {
    return this.restaurantModel.findAll({
      attributes: ["id", "name", "description", "location"],
      include: [
        {
          model: User,
          attributes: ["name", "email", "phone", "role"],
        },
        {
          model: District,
          attributes: ["name"],
          include: [
            {
              association: "region",
              attributes: ["name"],
            },
          ],
        },
        {
          model: Tables,
          attributes: ["id", "restaurantId", "tableNumber", "price"],
          include: [
            {
              model: Restaurant,
              attributes: ["name", "location"],
            },
          ],
        },
        {
          model: MenuCategory,
          attributes: ["name", "imageUrl"],
        },
        {
          model: RestaurantImage,
          attributes: ["imageUrl"],
          include: [
            {
              model: Restaurant,
              attributes: ["name"],
            },
          ],
        },
        {
          model: Review,
          attributes: ["comment", "rating"],
          include: [
            {
              model: User,
              attributes: ["name"],
            },
          ],
        },
        {
          model: Reservation,
          attributes: ["id", "guestCount", "time", "status"],
          include: [
            {
              model: User,
              attributes: ["name"],
            },
            {
              model: Tables,
              attributes: ["tableNumber"],
            },
            {
              model: Restaurant,
              attributes: ["name", "location"],
              include: [
                {
                  model: District,
                  attributes: ["name"],
                  include: [
                    {
                      association: "region",
                      attributes: ["name"],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          model: Announcement,
          attributes: ["title", "content", "imageUrl"],
          include: [
            {
              model: Restaurant,
              attributes: ["name"],
            },
          ],
        },
        {
          model: Payment,
          attributes: ["amount", "method", "status"],
          include: [
            {
              model: User,
              attributes: ["name"],
            },
            {
              model: Restaurant,
              attributes: ["name"],
            },
            {
              model: Reservation,
              attributes: [],
              include: [
                {
                  model: User,
                  attributes: ["name"],
                },
                {
                  model: Restaurant,
                  attributes: ["name"],
                },
                {
                  model: Tables,
                  attributes: ["tableNumber", "price"],
                },
              ],
            },
          ],
        },
        {
          model: OpeningSchedule,
          attributes: ["id", "dayOfWeek", "isOpen", "openAt", "closeAt"],
          include: [
            {
              model: Restaurant,
              attributes: ["name"],
            },
          ],
        },
      ],
    });
  }

  async findOne(id: number): Promise<Restaurant> {
    const restaurant = await this.restaurantModel.findByPk(id, {
      attributes: ["id", "name", "description", "location"],
      include: [
        {
          model: User,
          attributes: ["name", "email", "phone", "role"],
        },
        {
          model: District,
          attributes: ["name"],
          include: [
            {
              association: "region",
              attributes: ["name"],
            },
          ],
        },
        {
          model: Tables,
          attributes: ["id", "restaurantId", "tableNumber", "price"],
          include: [
            {
              model: Restaurant,
              attributes: ["name", "location"],
            },
          ],
        },
        {
          model: MenuCategory,
          attributes: ["name", "imageUrl"],
        },
        {
          model: RestaurantImage,
          attributes: ["imageUrl"],
          include: [
            {
              model: Restaurant,
              attributes: ["name"],
            },
          ],
        },
        {
          model: Review,
          attributes: ["comment", "rating"],
          include: [
            {
              model: User,
              attributes: ["name"],
            },
          ],
        },
        {
          model: Reservation,
          attributes: ["id", "guestCount", "time", "status"],
          include: [
            {
              model: User,
              attributes: ["name"],
            },
            {
              model: Tables,
              attributes: ["tableNumber"],
            },
            {
              model: Restaurant,
              attributes: ["name", "location"],
              include: [
                {
                  model: District,
                  attributes: ["name"],
                  include: [
                    {
                      association: "region",
                      attributes: ["name"],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          model: Announcement,
          attributes: ["title", "content", "imageUrl"],
          include: [
            {
              model: Restaurant,
              attributes: ["name"],
            },
          ],
        },
        {
          model: Payment,
          attributes: ["amount", "method", "status"],
          include: [
            {
              model: User,
              attributes: ["name"],
            },
            {
              model: Restaurant,
              attributes: ["name"],
            },
            {
              model: Reservation,
              attributes: [],
              include: [
                {
                  model: User,
                  attributes: ["name"],
                },
                {
                  model: Restaurant,
                  attributes: ["name"],
                },
                {
                  model: Tables,
                  attributes: ["tableNumber", "price"],
                },
              ],
            },
          ],
        },
        {
          model: OpeningSchedule,
          attributes: ["id", "dayOfWeek", "isOpen", "openAt", "closeAt"],
          include: [
            {
              model: Restaurant,
              attributes: ["name"],
            },
          ],
        },
      ],
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
