import { Module } from "@nestjs/common";
import { RestaurantImagesService } from "./restaurant-images.service";
import { RestaurantImagesController } from "./restaurant-images.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { RestaurantImage } from "./models/restaurant-image.model";
import { Restaurant } from "../restaurants/models/restaurant.model";

@Module({
  imports: [SequelizeModule.forFeature([RestaurantImage, Restaurant])],
  controllers: [RestaurantImagesController],
  providers: [RestaurantImagesService],
})
export class RestaurantImagesModule {}
