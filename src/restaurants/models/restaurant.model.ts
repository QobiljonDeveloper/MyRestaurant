import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { District } from "../../district/models/district.model";
import { Tables } from "../../tables/models/table.model";
import { MenuCategory } from "../../menu-categories/models/menu-category.model";
import { RestaurantImage } from "../../restaurant-images/models/restaurant-image.model";
import { Review } from "../../reviews/models/review.model";
import { Reservation } from "../../reservation/models/reservation.model";
import { Favorite } from "../../favorites/models/favorite.model";
import { Announcement } from "../../announcements/models/announcement.model";
import { Payment } from "../../payments/models/payment.model";
import { OpeningSchedule } from "../../opening-schedules/models/opening-schedule.model";

interface IRestaurantCreationAttr {
  name: string;
  description: string;
  location: string;
  districtId: number;
  ownerId: number;
  is_active?: boolean;
}

@Table({ tableName: "restaurants", timestamps: false })
export class Restaurant extends Model<Restaurant, IRestaurantCreationAttr> {
  @ApiProperty({ example: 1, description: "Restaurant ID" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: "Oqtepa Lavash", description: "Restaurant nomi" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @ApiProperty({
    example: "Fast food taomlar taklif etiladi",
    description: "Restaurant haqida qisqacha tavsif",
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare description: string;

  @ApiProperty({
    example: "Toshkent, Chilonzor 10-mavze",
    description: "Joylashuv manzili",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare location: string;

  @ApiProperty({ example: 3, description: "Tuman (district) ID" })
  @ForeignKey(() => District)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare districtId: number;

  @ApiProperty({ example: 5, description: "Restaurant egasi (User) ID" })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare ownerId: number;

  @ApiProperty({
    example: true,
    description: "Restaurant faollik holati (default: true)",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare is_active: boolean;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => District)
  district: District;

  @HasMany(() => Tables)
  table: Tables[];
  @HasMany(() => MenuCategory)
  menuCategory: MenuCategory[];

  @HasMany(() => RestaurantImage)
  restaurantImage: RestaurantImage[];

  @HasMany(() => Review)
  review: Review[];

  @HasMany(() => Reservation)
  reservation: Reservation[];

  @HasMany(() => Favorite)
  favorite: Favorite[];

  @HasMany(() => Announcement)
  announcment: Announcement[];

  @HasMany(() => Payment)
  payment: Payment[];

  @HasMany(() => OpeningSchedule)
  openingSchedules: OpeningSchedule[];
}
