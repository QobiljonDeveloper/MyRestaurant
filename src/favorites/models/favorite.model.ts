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

interface IFavoritesCreationAttr {
  userId: number;
  restaurantId: number;
}

@Table({ tableName: "favorites" })
export class Favorite extends Model<Favorite, IFavoritesCreationAttr> {
  @ApiProperty({ example: 1, description: "Sevimli yozuv ID raqami" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({
    example: 3,
    description: "Foydalanuvchi ID raqami (sevimli restoranni qo‘shgan)",
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare userId: number;

  @BelongsTo(() => User)
  user: User;

  @ApiProperty({
    example: 5,
    description: "Sevimlilar ro‘yxatiga qo‘shilgan restoran ID raqami",
  })
  @ForeignKey(() => Restaurant)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare restaurantId: number;

  @BelongsTo(() => Restaurant)
  restaurant: Restaurant;
}
