import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUrl,
  Min,
} from "class-validator";

export class CreateRestaurantImageDto {
  @ApiProperty({
    example: 1,
    description: "Restoran ID (tashqi kalit)",
  })
  @IsInt({ message: "restaurantId butun son bo‘lishi kerak" })
  @Min(1, { message: "restaurantId 1 dan katta bo‘lishi kerak" })
  restaurantId: number;

  @ApiProperty({
    example: "https://example.com/image.jpg",
    description: "Rasm URL manzili",
  })
  @IsString({ message: "imageUrl matn bo‘lishi kerak" })
  @IsNotEmpty({ message: "imageUrl bo‘sh bo‘lmasligi kerak" })
  imageUrl: string;

  @ApiProperty({
    example: true,
    description: "Asosiy rasmmi yoki yo‘qmi",
  })
  @IsBoolean({ message: "is_main faqat true yoki false bo‘lishi kerak" })
  is_main: boolean;
}
