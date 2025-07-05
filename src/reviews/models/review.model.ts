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

interface IReviewsCreationAttr {
  userId: number;
  restaurantId: number;
  rating: number;
  comment: string;
}

@Table({ tableName: "reviews" })
export class Review extends Model<Review, IReviewsCreationAttr> {
  @ApiProperty({ example: 1, description: "Sharh ID raqami" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: 1,
    description: "Sharh yozgan foydalanuvchi ID raqami",
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare userId: number;

  @ApiProperty({
    example: 5,
    description: "Sharh yozilgan restoran ID raqami",
  })
  @ForeignKey(() => Restaurant)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare restaurantId: number;

  @ApiProperty({
    example: 4,
    description: "Foydalanuvchi tomonidan berilgan reyting (1 - 5 oralig‘ida)",
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare rating: number;

  @ApiProperty({
    example: "Juda zo‘r xizmat!",
    description: "Foydalanuvchi tomonidan yozilgan sharh matni",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare comment: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Restaurant)
  restaurant: Restaurant;
}
