import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Region } from "../../regions/models/region.models";
import { ApiProperty } from "@nestjs/swagger";
import { Restaurant } from "../../restaurants/models/restaurant.model";

interface IDistrictCreationAttr {
  name: string;
  regionId: number;
}

@Table({ tableName: "district", timestamps: false })
export class District extends Model<District, IDistrictCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Tumanning unikal ID raqami",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "Chilonzor",
    description: "Tuman (district) nomi",
  })
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  declare name: string;

  @ApiProperty({
    example: 2,
    description: "Region ID (ushbu tuman qaysi regionga tegishli)",
  })
  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "region_id",
  })
  declare regionId: number;

  @BelongsTo(() => Region)
  region: Region;

  @HasMany(() => Restaurant)
  restaurant: Restaurant[];
}
