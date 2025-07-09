import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { UpdateReservationDto } from "./dto/update-reservation.dto";
import { Reservation } from "./models/reservation.model";
import { User } from "../users/models/user.model";
import { Tables as RestaurantTable } from "../tables/models/table.model";
import { Restaurant } from "../restaurants/models/restaurant.model";
import { Op } from "sequelize";

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation) private reservationModel: typeof Reservation,
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Restaurant) private restaurantModel: typeof Restaurant,
    @InjectModel(RestaurantTable)
    private tableModel: typeof RestaurantTable
  ) {}

  async create(createReservationDto: CreateReservationDto) {
    const { userId, restaurantId, tableId } = createReservationDto;

    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException(`Foydalanuvchi topilmadi: ID ${userId}`);
    }

    const restaurant = await this.restaurantModel.findByPk(restaurantId);
    if (!restaurant) {
      throw new NotFoundException(`Restoran topilmadi: ID ${restaurantId}`);
    }

    const table = await this.tableModel.findByPk(tableId);
    if (!table) {
      throw new NotFoundException(`Stol topilmadi: ID ${tableId}`);
    }

    const reservation =
      await this.reservationModel.create(createReservationDto);
    return reservation;
  }

  getTodayReservations() {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    return this.reservationModel.findAll({
      where: {
        createdAt: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
      include: [User, Restaurant, RestaurantTable],
    });
  }

  async findAll() {
    return this.reservationModel.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name"],
        },
        {
          model: Restaurant,
          attributes: ["id", "name"],
        },
        {
          model: RestaurantTable,
          attributes: { exclude: [] },
          include: [
            {
              model: Restaurant,
              attributes: ["id", "name", "location"],
            },
          ],
        },
      ],
    });
  }

  async findOne(id: number) {
    const reservation = await this.reservationModel.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["id", "name"],
        },
        {
          model: Restaurant,
          attributes: ["id", "name"],
        },
        {
          model: RestaurantTable,
          attributes: { exclude: [] },
          include: [
            {
              model: Restaurant,
              attributes: ["id", "name", "location"],
            },
          ],
        },
      ],
    });

    if (!reservation) {
      throw new NotFoundException(`Bandlov topilmadi: ID ${id}`);
    }
    return reservation;
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    const reservation = await this.reservationModel.findByPk(id);
    if (!reservation) {
      throw new NotFoundException(`Bandlov topilmadi: ID ${id}`);
    }
    return reservation.update(updateReservationDto);
  }

  async remove(id: number) {
    const reservation = await this.reservationModel.findByPk(id);
    if (!reservation) {
      throw new NotFoundException(`Bandlov topilmadi: ID ${id}`);
    }
    await reservation.destroy();
    return { message: `Bandlov o‘chirildi: ID ${id}` };
  }
}
