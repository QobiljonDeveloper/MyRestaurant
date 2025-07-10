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

interface IAnnouncementsCreationAttr {
  restaurantId: number;
  title: string;
  content: string;
  imageUrl?: string; 
  isActive: boolean;
}

@Table({ tableName: "announcements" })
export class Announcement extends Model<
  Announcement,
  IAnnouncementsCreationAttr
> {
  @ApiProperty({ example: 1, description: "Eʼlon ID raqami" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({
    example: 5,
    description: "Restoran ID raqami (kimga tegishli)",
  })
  @ForeignKey(() => Restaurant)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare restaurantId: number;

  @BelongsTo(() => Restaurant)
  declare restaurant: Restaurant;

  @ApiProperty({
    example: "Chegirmalar boshlandi!",
    description: "Eʼlon sarlavhasi",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare title: string;

  @ApiProperty({
    example: "Bugundan boshlab barcha ovqatlarga 20% chegirma!",
    description: "Eʼlonning asosiy matni",
  })
  @Column({ type: DataType.TEXT, allowNull: false })
  declare content: string;

  @ApiProperty({
    example: "https://example.com/images/announcement.jpg",
    description: "Eʼlon rasmi (URL)",
    required: false,
  })
  @Column({ type: DataType.STRING, allowNull: true })
  declare imageUrl?: string;

  @ApiProperty({ example: true, description: "Eʼlon faolmi yoki yo‘q" })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare isActive: boolean;
}
