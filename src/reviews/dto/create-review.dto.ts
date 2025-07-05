import { ApiProperty } from "@nestjs/swagger";
import {
  IsNumber,
  IsNotEmpty,
  Min,
  Max,
  IsString,
  Length,
} from "class-validator";

export class CreateReviewDto {
  @ApiProperty({
    example: 1,
    description: "Foydalanuvchi ID raqami (sharh yozgan foydalanuvchi)",
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example: 5,
    description: "Restoran ID raqami (qaysi restoran uchun sharh yozilmoqda)",
  })
  @IsNumber()
  @IsNotEmpty()
  restaurantId: number;

  @ApiProperty({
    example: 4,
    description: "Reyting qiymati (1 dan 5 gacha)",
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  rating: number;

  @ApiProperty({
    example: "Taomlar juda mazali va xizmat ko‘rsatish a’lo darajada!",
    description: "Foydalanuvchi tomonidan yozilgan izoh",
  })
  @IsString()
  @Length(3, 500)
  comment: string;
}
