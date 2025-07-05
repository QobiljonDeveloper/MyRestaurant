import { Module } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { ReviewsController } from "./reviews.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Review } from "./models/review.model";
import { Restaurant } from "../restaurants/models/restaurant.model";
import { User } from "../users/models/user.model";

@Module({
  imports: [SequelizeModule.forFeature([Review, Restaurant, User])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
