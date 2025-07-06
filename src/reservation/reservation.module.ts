import { Module } from "@nestjs/common";
import { ReservationService } from "./reservation.service";
import { ReservationController } from "./reservation.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users/models/user.model";
import { Restaurant } from "../restaurants/models/restaurant.model";
import { Tables as RestaurantTable } from "../tables/models/table.model";
import { Reservation } from "./models/reservation.model";
import { AuthModule } from "../auth/auth.module";
@Module({
  imports: [
    SequelizeModule.forFeature([
      Reservation,
      User,
      Restaurant,
      RestaurantTable,
    ]),
    AuthModule,

  ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
