import { Module } from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { PaymentsController } from "./payments.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Payment } from "./models/payment.model";
import { Reservation } from "../reservation/models/reservation.model";
import { Restaurant } from "../restaurants/models/restaurant.model";
import { User } from "../users/models/user.model";

@Module({
  imports: [
    SequelizeModule.forFeature([Payment, User, Restaurant, Reservation]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
