import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Restaurant } from "../../restaurants/models/restaurant.model";
import { Menu } from "../../menu/models/menu.model";

interface IMenuCategoriesCreationAttr {
  restaurantId: number;
  name: string;
  description: string;
  imageUrl: string;
}

@Table({ tableName: "menu_categories" })
export class MenuCategory extends Model<
  MenuCategory,
  IMenuCategoriesCreationAttr
> {
  @ApiProperty({ example: 1, description: "Kategoriya ID raqami" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({
    example: 3,
    description: "Kategoriya tegishli restoranning ID raqami",
  })
  @ForeignKey(() => Restaurant)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare restaurantId: number;

  @BelongsTo(() => Restaurant)
  restaurant: Restaurant;

  @ApiProperty({ example: "Ichimliklar", description: "Kategoriya nomi" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @ApiProperty({
    example: "Turli xil alkogolsiz ichimliklar",
    description: "Kategoriya tavsifi",
  })
  @Column({ type: DataType.TEXT })
  declare description: string;

  @ApiProperty({
    example: "https://example.com/image.jpg",
    description: "Kategoriya rasmi uchun URL",
  })
  @Column({ type: DataType.STRING })
  declare imageUrl: string;

  @HasMany(() => Menu)
  menu: Menu[];
}
