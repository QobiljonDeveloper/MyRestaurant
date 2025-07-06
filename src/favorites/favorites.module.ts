import { Module } from "@nestjs/common";
import { FavoritesService } from "./favorites.service";
import { FavoritesController } from "./favorites.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Favorite } from "./models/favorite.model";
import { User } from "../users/models/user.model";
import { Restaurant } from "../restaurants/models/restaurant.model";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Favorite, User, Restaurant]),
    AuthModule,
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
