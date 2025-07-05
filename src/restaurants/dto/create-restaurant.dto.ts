import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsBoolean,
  IsOptional,
} from "class-validator";

export class CreateRestaurantDto {
  @ApiProperty({ example: "Oqtepa Lavash", description: "Restaurant nomi" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "Fast food taomlar taklif etiladi",
    description: "Restaurant haqida tavsif",
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: "Toshkent, Chilonzor 10-mavze",
    description: "Joylashuv manzili",
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: 3, description: "Tuman ID raqami" })
  @IsInt()
  districtId: number;

  @ApiProperty({ example: 5, description: "Restaurant egasi (User ID)" })
  @IsInt()
  ownerId: number;

  @ApiProperty({
    example: true,
    description: "Restaurant faollik holati (ixtiyoriy)",
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
