import { Module } from "@nestjs/common";
import { TablesService } from "./tables.service";
import { TablesController } from "./tables.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Tables } from "./models/table.model";
import { RestaurantsModule } from "../restaurants/restaurants.module";
import { Restaurant } from "../restaurants/models/restaurant.model";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Tables, Restaurant]),
    AuthModule,
    RestaurantsModule,
  ],
  controllers: [TablesController],
  providers: [TablesService],
})
export class TablesModule {}
