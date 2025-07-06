import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/models/user.model";
import { Tables as RestaurantTable } from "../../tables/models/table.model";
import { Restaurant } from "../../restaurants/models/restaurant.model";
import { Payment } from "../../payments/models/payment.model";

export enum ReservationStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
}

interface IReservationCreationAttr {
  userId: number;
  tableId: number;
  restaurantId: number;
  time: string;
  guestCount: number;
  status: ReservationStatus;
}

@Table({ tableName: "reservations" })
export class Reservation extends Model<Reservation, IReservationCreationAttr> {
  @ApiProperty({ example: 1, description: "Bandlov ID raqami" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({
    example: 3,
    description: "Bandlov qilgan foydalanuvchining ID raqami",
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare userId: number;

  @BelongsTo(() => User)
  user: User;

  @ApiProperty({ example: 5, description: "Band qilingan stolning ID raqami" })
  @ForeignKey(() => RestaurantTable)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare tableId: number;

  @BelongsTo(() => RestaurantTable)
  table: RestaurantTable;

  @ApiProperty({ example: 2, description: "Restoran ID raqami" })
  @ForeignKey(() => Restaurant)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare restaurantId: number;

  @BelongsTo(() => Restaurant)
  restaurant: Restaurant;

  @ApiProperty({
    example: "2025-07-06T18:30:00Z",
    description: "Bandlov vaqti ",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare time: string;

  @ApiProperty({ example: 4, description: "Mehmonlar soni" })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare guestCount: number;

  @ApiProperty({
    example: ReservationStatus.PENDING,
    description: "Bandlov holati (pending, confirmed, cancelled)",
  })
  @Column({
    type: DataType.ENUM("pending", "confirmed", "cancelled"),
    defaultValue: ReservationStatus.PENDING,
  })
  declare status: ReservationStatus;

  @HasMany(() => Payment)
  payment: Payment[];
}
