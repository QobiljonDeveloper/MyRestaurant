import { Module } from "@nestjs/common";
import { MenuCategoriesService } from "./menu-categories.service";
import { MenuCategoriesController } from "./menu-categories.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { MenuCategory } from "./models/menu-category.model";
import { Restaurant } from "../restaurants/models/restaurant.model";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [SequelizeModule.forFeature([MenuCategory, Restaurant]), AuthModule],
  controllers: [MenuCategoriesController],
  providers: [MenuCategoriesService],
})
export class MenuCategoriesModule {}
