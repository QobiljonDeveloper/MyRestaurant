import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Menu } from "../../menu/models/menu.model";

interface IMenuImagesCreationAttr {
  menuId: number;
  imageUrl: string;
  isMain: boolean;
}

@Table({ tableName: "menu_images" })
export class MenuImage extends Model<MenuImage, IMenuImagesCreationAttr> {
  @ApiProperty({ example: 1, description: "Rasmning unikal ID raqami" })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @ApiProperty({ example: 5, description: "Tegishli menyu ID (foreign key)" })
  @ForeignKey(() => Menu)
  @Column({ type: DataType.INTEGER })
  declare menuId: number;

  @ApiProperty({
    example: "https://example.com/image.jpg",
    description: "Rasm URL manzili",
  })
  @Column({ type: DataType.STRING })
  declare imageUrl: string;

  @ApiProperty({ example: true, description: "Asosiy rasmmi?" })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare isMain: boolean;

  @BelongsTo(() => Menu)
  menu: Menu;
}
