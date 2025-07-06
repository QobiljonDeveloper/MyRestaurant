import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Restaurant } from "../../restaurants/models/restaurant.model";

export enum DaysOfWeekEnum {
  DUSHANBA = "dushanba",
  SESHANBA = "seshanba",
  CHORSHANBA = "chorshanba",
  PAYSHANBA = "payshanba",
  JUMA = "juma",
  SHANBA = "shanba",
  YAKSHANBA = "yakshanba",
}

interface IOpeningSchedulesCreationAttr {
  restaurantId: number;
  dayOfWeek: DaysOfWeekEnum;
  isOpen: boolean;
  openAt: string;
  closeAt: string;
}

@Table({ tableName: "opening_schedules" })
export class OpeningSchedule extends Model<
  OpeningSchedule,
  IOpeningSchedulesCreationAttr
> {
  @ApiProperty({ example: 1, description: "Jadval ID raqami" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: 10, description: "Restoran ID raqami" })
  @ForeignKey(() => Restaurant)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare restaurantId: number;

  @BelongsTo(() => Restaurant)
  restaurant: Restaurant;

  @ApiProperty({
    example: DaysOfWeekEnum.DUSHANBA,
    description: "Haftaning kuni (o‘zbek tilida)",
    enum: DaysOfWeekEnum,
  })
  @Column({
    type: DataType.ENUM(...Object.values(DaysOfWeekEnum)),
    allowNull: false,
  })
  declare dayOfWeek: DaysOfWeekEnum;

  @ApiProperty({ example: true, description: "Ochilganmi yoki yo‘q" })
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  declare isOpen: boolean;

  @ApiProperty({ example: "09:00", description: "Ochilish vaqti" })
  @Column({ type: DataType.STRING, allowNull: true })
  declare openAt: string;

  @ApiProperty({ example: "21:00", description: "Yopilish vaqti" })
  @Column({ type: DataType.STRING, allowNull: true })
  declare closeAt: string;
}
