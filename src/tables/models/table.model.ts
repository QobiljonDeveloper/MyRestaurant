import {
  Column,
  DataType,
  Model,
  Table as SequelizeTable,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Restaurant } from "../../restaurants/models/restaurant.model";
import { Reservation } from "../../reservation/models/reservation.model";

interface ITableCreationAttr {
  restaurantId: number;
  tableNumber: number;
  seats: number;
  price: number;
  isPrivate: boolean;
  isAvialable: boolean;
}

@SequelizeTable({ tableName: "tables" })
export class Tables extends Model<Tables, ITableCreationAttr> {
  @ApiProperty({ example: 1, description: "Stolning unikal ID raqami" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: 5, description: "Restoran ID (tashqi kalit)" })
  @ForeignKey(() => Restaurant)
  @Column({ type: DataType.INTEGER })
  declare restaurantId: number;

  @ApiProperty({ example: "12", description: "Stol raqami" })
  @Column({ type: DataType.INTEGER })
  declare tableNumber: number;

  @ApiProperty({ example: 4, description: "Stoldagi o‘rindiqlar soni" })
  @Column({ type: DataType.INTEGER })
  declare seats: number;

  @ApiProperty({ example: 50000, description: "Stol narxi (so‘mda)" })
  @Column({ type: DataType.INTEGER })
  declare price: number;

  @ApiProperty({ example: true, description: "Stol maxsus xonami?" })
  @Column({ type: DataType.BOOLEAN })
  declare isPrivate: boolean;

  @ApiProperty({ example: true, description: "Stol hozir mavjudmi?" })
  @Column({ type: DataType.BOOLEAN })
  declare isAvialable: boolean;

  @ApiProperty({
    type: () => Restaurant,
    description: "Tegishli restoran obyekti",
  })
  @BelongsTo(() => Restaurant)
  restaurant: Restaurant;

  @HasMany(() => Reservation)
  reservation: Reservation[];
}
