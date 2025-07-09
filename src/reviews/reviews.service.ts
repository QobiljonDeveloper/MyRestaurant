import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { Review } from "./models/review.model";
import { User } from "../users/models/user.model";
import { Restaurant } from "../restaurants/models/restaurant.model";
import { Sequelize } from "sequelize";

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review) private reviewRepo: typeof Review,
    @InjectModel(User) private userRepo: typeof User,
    @InjectModel(Restaurant) private restaurantRepo: typeof Restaurant
  ) {}

  async create(dto: CreateReviewDto) {
    if (dto.rating < 1 || dto.rating > 5) {
      throw new BadRequestException("Reyting 1 dan 5 gacha bo'lishi kerak");
    }

    const user = await this.userRepo.findByPk(dto.userId);
    if (!user) throw new NotFoundException("Foydalanuvchi topilmadi");

    const restaurant = await this.restaurantRepo.findByPk(dto.restaurantId);
    if (!restaurant) throw new NotFoundException("Restoran topilmadi");

    return this.reviewRepo.create({
      userId: dto.userId,
      restaurantId: dto.restaurantId,
      rating: dto.rating,
      comment: dto.comment,
    });
  }

  async findAll() {
    return this.reviewRepo.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name"],
        },
        {
          model: Restaurant,
          attributes: ["id", "name"],
        },
      ],
    });
  }

  async findOne(id: number) {
    const review = await this.reviewRepo.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["id", "name"],
        },
        {
          model: Restaurant,
          attributes: ["id", "name"],
        },
      ],
    });
    if (!review) throw new NotFoundException("Sharh topilmadi");
    return review;
  }

  async update(id: number, dto: UpdateReviewDto) {
    if (dto.rating && (dto.rating < 1 || dto.rating > 5)) {
      throw new BadRequestException("Reyting 1 dan 5 gacha bo'lishi kerak");
    }

    const review = await this.reviewRepo.findByPk(id);
    if (!review) throw new NotFoundException("Sharh topilmadi");

    return review.update({
      rating: dto.rating,
      comment: dto.comment,
    });
  }

  async remove(id: number) {
    const review = await this.reviewRepo.findByPk(id);
    if (!review) throw new NotFoundException("Sharh topilmadi");

    await review.destroy();
    return { message: "Sharh o‘chirildi" };
  }

  async getTopReviewedRestaurants(limit = 10) {
    const result = await this.reviewRepo.findAll({
      attributes: [
        "restaurantId",
        [Sequelize.fn("COUNT", Sequelize.col("Review.id")), "reviewCount"],
      ],
      include: [
        {
          model: this.restaurantRepo,
          attributes: [
            "id",
            "name",
            "description",
            "location",
            "districtId",
            "ownerId",
            "is_active",
          ],
        },
      ],
      group: ["Review.restaurantId", "restaurant.id"],
      order: [[Sequelize.fn("COUNT", Sequelize.col("Review.id")), "DESC"]],
      limit,
    });

    return result;
  }

  async getTopRatedRestaurants(limit = 10) {
    return this.reviewRepo.findAll({
      attributes: [
        "restaurantId",
        [Sequelize.fn("AVG", Sequelize.col("rating")), "avgRating"],
      ],
      group: ["restaurantId", "restaurant.id"],
      order: [[Sequelize.literal(`"avgRating"`), "DESC"]],
      limit,
      include: [
        {
          model: this.restaurantRepo,
          as: "restaurant",
        },
      ],
    });
  }

  async findMine(userId: number) {
    console.log("Mine uchun userId:", userId);

    return this.reviewRepo.findAll({
      where: { userId },
      include: [
        {
          model: Restaurant,
          as: "restaurant",
        },
      ],
      order: [["createdAt", "DESC"]],
    });
  }
}
