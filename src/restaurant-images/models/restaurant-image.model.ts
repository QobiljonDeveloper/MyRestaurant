import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Restaurant } from "../../restaurants/models/restaurant.model";

interface IRestaurantImageCreationAttr {
  restaurantId: number;
  imageUrl: string;
  is_main: boolean;
}

@Table({ tableName: "restaurant_images" })
export class RestaurantImage extends Model<
  RestaurantImage,
  IRestaurantImageCreationAttr
> {
  @ApiProperty({ example: 1, description: "Unikal ID raqami" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: 3, description: "Tegishli restoran IDsi" })
  @ForeignKey(() => Restaurant)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare restaurantId: number;

  @ApiProperty({
    example: "https://example.com/image.jpg",
    description: "Rasm URL manzili",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare imageUrl: string;

  @ApiProperty({ example: true, description: "Asosiy rasmmi yoki yo‘qmi" })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_main: boolean;

  @BelongsTo(() => Restaurant)
  restaurant: Restaurant;
}
