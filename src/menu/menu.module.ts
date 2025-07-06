import { Module } from "@nestjs/common";
import { MenuService } from "./menu.service";
import { MenuController } from "./menu.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Menu } from "./models/menu.model";
import { AuthModule } from "../auth/auth.module";
import { RestaurantsModule } from "../restaurants/restaurants.module";
@Module({
  imports: [SequelizeModule.forFeature([Menu]), AuthModule, RestaurantsModule],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
