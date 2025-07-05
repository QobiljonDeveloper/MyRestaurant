import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from "class-validator";

export class CreateMenuImageDto {
  @ApiProperty({
    example: 5,
    description: "Tegishli menyu ID (foreign key)",
  })
  @IsInt({ message: "menuId butun son bo‘lishi kerak" })
  @Min(1, { message: "menuId 1 dan katta bo‘lishi kerak" })
  menuId: number;

  @ApiProperty({
    example: "https://example.com/image.jpg",
    description: "Rasmning to‘liq URL manzili",
  })
  @IsString({ message: "imageUrl matn bo‘lishi kerak" })
  @IsNotEmpty({ message: "imageUrl bo‘sh bo‘lishi mumkin emas" })
  imageUrl: string;

  @ApiProperty({
    example: true,
    description: "Asosiy rasmmi? (true yoki false)",
  })
  @IsBoolean({ message: "isMain faqat true yoki false bo‘lishi mumkin" })
  isMain: boolean;
}
