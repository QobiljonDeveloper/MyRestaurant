import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { Payment } from "./models/payment.model";
import { User } from "../users/models/user.model";
import { Restaurant } from "../restaurants/models/restaurant.model";
import { Reservation } from "../reservation/models/reservation.model";

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment)
    private paymentModel: typeof Payment,

    @InjectModel(User)
    private userModel: typeof User,

    @InjectModel(Restaurant)
    private restaurantModel: typeof Restaurant,

    @InjectModel(Reservation)
    private reservationModel: typeof Reservation
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const { userId, restaurantId, reservationId } = createPaymentDto;

    const user = await this.userModel.findByPk(userId);
    if (!user)
      throw new NotFoundException(`Foydalanuvchi topilmadi: ID ${userId}`);

    const restaurant = await this.restaurantModel.findByPk(restaurantId);
    if (!restaurant)
      throw new NotFoundException(`Restoran topilmadi: ID ${restaurantId}`);

    const reservation = await this.reservationModel.findByPk(reservationId);
    if (!reservation)
      throw new NotFoundException(`Bron topilmadi: ID ${reservationId}`);

    const payment = await this.paymentModel.create(createPaymentDto);
    return payment;
  }

  async findAll() {
    return this.paymentModel.findAll({
      include: [User, Restaurant, Reservation],
    });
  }

  async findOne(id: number) {
    const payment = await this.paymentModel.findByPk(id, {
      include: [User, Restaurant, Reservation],
    });
    if (!payment) throw new NotFoundException(`Toʻlov topilmadi: ID ${id}`);
    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.paymentModel.findByPk(id);
    if (!payment) throw new NotFoundException(`Toʻlov topilmadi: ID ${id}`);
    return payment.update(updatePaymentDto);
  }

  async remove(id: number) {
    const payment = await this.paymentModel.findByPk(id);
    if (!payment) throw new NotFoundException(`Toʻlov topilmadi: ID ${id}`);
    await payment.destroy();
    return { message: `Toʻlov o‘chirildi: ID ${id}` };
  }
}
