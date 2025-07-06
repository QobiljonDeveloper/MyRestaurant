import { Module } from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { PaymentsController } from "./payments.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Payment } from "./models/payment.model";
import { Reservation } from "../reservation/models/reservation.model";
import { Restaurant } from "../restaurants/models/restaurant.model";
import { User } from "../users/models/user.model";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Payment, User, Restaurant, Reservation]),
    AuthModule,
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
