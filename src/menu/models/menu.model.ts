import {
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  Model,
  Table,
  HasMany,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Restaurant } from "../../restaurants/models/restaurant.model";
import { MenuCategory } from "../../menu-categories/models/menu-category.model";
import { MenuImage } from "../../menu-images/models/menu-image.model";

interface IMenuCreationAttr {
  restaurantId: number;
  name: string;
  description: string;
  price: number;
  menuCategoryId: number;
}

@Table({ tableName: "menus" })
export class Menu extends Model<Menu, IMenuCreationAttr> {
  @ApiProperty({ example: 1, description: "Menu ID raqami" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: 2, description: "Restoran ID (tashqi kalit)" })
  @ForeignKey(() => Restaurant)
  @Column({ type: DataType.INTEGER })
  declare restaurantId: number;

  @BelongsTo(() => Restaurant)
  restaurant: Restaurant;

  @ApiProperty({ example: "Lavash", description: "Menu nomi" })
  @Column({ type: DataType.STRING })
  declare name: string;

  @ApiProperty({
    example: "Mol go‘shtli lavash, sabzavotli, achchiq sous bilan",
    description: "Tavsifi",
  })
  @Column({ type: DataType.STRING })
  declare description: string;

  @ApiProperty({ example: 45000, description: "Narxi (so‘mda)" })
  @Column({ type: DataType.INTEGER })
  declare price: number;

  @ApiProperty({ example: 3, description: "Menu kategoriya ID (tashqi kalit)" })
  @ForeignKey(() => MenuCategory)
  @Column({ type: DataType.INTEGER })
  declare menuCategoryId: number;

  @BelongsTo(() => MenuCategory)
  menuCategory: MenuCategory;

  @HasMany(() => MenuImage)
  menuImage: MenuImage[];
}
