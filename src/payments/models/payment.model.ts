import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/models/user.model";
import { Restaurant } from "../../restaurants/models/restaurant.model";
import { Reservation } from "../../reservation/models/reservation.model";

export enum PaymentStatusEnum {
  PENDING = "pending",
  PAID = "paid",
  FAILED = "failed",
}

export enum PaymentMethodsEnum {
  CASH = "cash",
  CARD = "card",
  CLICK = "click",
  PAYME = "payme",
  UZUM = "uzum",
}

interface IPaymentsCreationAttr {
  userId: number;
  reservationId: number;
  restaurantId: number;
  amount: number;
  method: PaymentMethodsEnum;
  status: PaymentStatusEnum;
}

@Table({ tableName: "payments" })
export class Payment extends Model<Payment, IPaymentsCreationAttr> {
  @ApiProperty({ example: 1, description: "Toʻlov ID raqami" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: 1, description: "Foydalanuvchi ID raqami" })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare userId: number;

  @BelongsTo(() => User)
  user: User;

  @ApiProperty({ example: 10, description: "Restoran ID raqami" })
  @ForeignKey(() => Restaurant)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare restaurantId: number;

  @BelongsTo(() => Restaurant)
  restaurant: Restaurant;

  @ApiProperty({ example: 3, description: "Bron ID raqami" })
  @ForeignKey(() => Reservation)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare reservationId: number;

  @BelongsTo(() => Reservation)
  reservation: Reservation;

  @ApiProperty({ example: 250000, description: "Toʻlov summasi (so‘mda)" })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare amount: number;

  @ApiProperty({
    example: PaymentMethodsEnum.CARD,
    enum: PaymentMethodsEnum,
    description: "Toʻlov turi",
  })
  @Column({
    type: DataType.ENUM(...Object.values(PaymentMethodsEnum)),
    allowNull: false,
  })
  declare method: PaymentMethodsEnum;

  @ApiProperty({
    example: PaymentStatusEnum.PAID,
    enum: PaymentStatusEnum,
    description: "Toʻlov holati",
  })
  @Column({
    type: DataType.ENUM(...Object.values(PaymentStatusEnum)),
    allowNull: false,
  })
  declare status: PaymentStatusEnum;
}
