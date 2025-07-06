import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
} from "class-validator";

export class CreateAnnouncementDto {
  @ApiProperty({ example: 5, description: "Restoran ID raqami" })
  @IsNumber()
  @IsNotEmpty()
  restaurantId: number;

  @ApiProperty({ example: "Yangi menyu", description: "Eʼlon sarlavhasi" })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: "Bizda yangi taomlar paydo bo‘ldi. Albatta tatib ko‘ring!",
    description: "Eʼlon mazmuni",
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    example: "https://example.com/image.jpg",
    description: "Eʼlon uchun rasm manzili",
    required: false,
  })
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ example: true, description: "Eʼlon faolmi yoki yo‘q" })
  @IsBoolean()
  isActive: boolean;
}
