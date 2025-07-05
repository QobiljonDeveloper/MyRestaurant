import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsUrl, Min, Length } from "class-validator";

export class CreateMenuCategoryDto {
  @ApiProperty({ example: 1, description: "Restoran IDsi" })
  @IsInt({ message: "restaurantId butun son bo‘lishi kerak" })
  @Min(1, { message: "restaurantId 1 dan katta bo‘lishi kerak" })
  restaurantId: number;

  @ApiProperty({ example: "Ichimliklar", description: "Kategoriya nomi" })
  @IsString()
  @Length(2, 50, { message: "name uzunligi 2-50 orasida bo‘lishi kerak" })
  name: string;

  @ApiProperty({
    example: "Turli ichimliklar",
    description: "Kategoriya haqida tavsif",
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: "https://example.com/image.jpg",
    description: "Kategoriya rasmi",
  })
  imageUrl: string;
}
