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

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review) private reviewRepo: typeof Review,
    @InjectModel(User) private userRepo: typeof User,
    @InjectModel(Restaurant) private restaurantRepo: typeof Restaurant
  ) {}

  async create(dto: CreateReviewDto) {
    const user = await this.userRepo.findByPk(dto.userId);
    if (!user) {
      throw new NotFoundException("Foydalanuvchi topilmadi");
    }

    const restaurant = await this.restaurantRepo.findByPk(dto.restaurantId);
    if (!restaurant) {
      throw new NotFoundException("Restoran topilmadi");
    }

    const existing = await this.reviewRepo.findOne({
      where: { userId: dto.userId, restaurantId: dto.restaurantId },
    });
    if (existing) {
      throw new BadRequestException(
        "Bu foydalanuvchi allaqachon sharh qoldirgan"
      );
    }

    return this.reviewRepo.create(dto);
  }

  async findAll() {
    return this.reviewRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const review = await this.reviewRepo.findByPk(id);
    if (!review) {
      throw new NotFoundException("Sharh topilmadi");
    }
    return review;
  }

  async update(id: number, dto: UpdateReviewDto) {
    const review = await this.reviewRepo.findByPk(id);
    if (!review) {
      throw new NotFoundException("Yangilanishi kerak bo‘lgan sharh topilmadi");
    }
    return review.update(dto);
  }

  async remove(id: number) {
    const review = await this.reviewRepo.findByPk(id);
    if (!review) {
      throw new NotFoundException("O‘chiriladigan sharh topilmadi");
    }
    await review.destroy();
    return { message: "Sharh muvaffaqiyatli o‘chirildi" };
  }
}
