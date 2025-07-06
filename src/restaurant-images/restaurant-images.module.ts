import { Module } from "@nestjs/common";
import { RestaurantImagesService } from "./restaurant-images.service";
import { RestaurantImagesController } from "./restaurant-images.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { RestaurantImage } from "./models/restaurant-image.model";
import { Restaurant } from "../restaurants/models/restaurant.model";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    SequelizeModule.forFeature([RestaurantImage, Restaurant]),
    AuthModule,
  ],
  controllers: [RestaurantImagesController],
  providers: [RestaurantImagesService],
})
export class RestaurantImagesModule {}
