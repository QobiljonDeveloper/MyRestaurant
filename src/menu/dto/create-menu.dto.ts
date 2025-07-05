import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive, IsString, Length, Min } from "class-validator";

export class CreateMenuDto {
  @ApiProperty({ example: 1, description: "Restoran ID (tashqi kalit)" })
  @IsInt({ message: "restaurantId butun son bo‘lishi kerak" })
  @Min(1, { message: "restaurantId 1 dan katta bo‘lishi kerak" })
  restaurantId: number;

  @ApiProperty({ example: "Lavash", description: "Menu nomi" })
  @IsString({ message: "name matn bo‘lishi kerak" })
  @Length(2, 50, {
    message: "name 2 dan 50 tagacha belgidan iborat bo‘lishi kerak",
  })
  name: string;

  @ApiProperty({
    example: "Mol go‘shtli lavash, sabzavotli, achchiq sous bilan",
    description: "Menu tavsifi",
  })
  @IsString({ message: "description matn bo‘lishi kerak" })
  @Length(5, 255, {
    message: "description 5 dan 255 tagacha belgidan iborat bo‘lishi kerak",
  })
  description: string;

  @ApiProperty({ example: 45000, description: "Narxi (so‘mda)" })
  @IsInt({ message: "price butun son bo‘lishi kerak" })
  @IsPositive({ message: "price musbat son bo‘lishi kerak" })
  price: number;

  @ApiProperty({
    example: 3,
    description: "Menu kategoriya ID (tashqi kalit)",
  })
  @IsInt({ message: "menuCategoryId butun son bo‘lishi kerak" })
  @Min(1, { message: "menuCategoryId 1 dan katta bo‘lishi kerak" })
  menuCategoryId: number;
}
