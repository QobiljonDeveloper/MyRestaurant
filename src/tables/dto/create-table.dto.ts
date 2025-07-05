import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsInt,
  IsPositive,
  IsString,
  Length,
  Min,
} from "class-validator";

export class CreateTableDto {
  @ApiProperty({
    example: 1,
    description: "Restoran ID (tashqi kalit)",
  })
  @IsInt({ message: "restaurantId butun son bo‘lishi kerak" })
  @Min(1, { message: "restaurantId 1 dan katta bo‘lishi kerak" })
  restaurantId: number;

  @ApiProperty({
    example: "12",
    description: "Stol raqami",
  })
  @IsInt({ message: "tableNumber butun son bo‘lishi kerak" })
  @Min(1, { message: "tableNumber 1 dan katta bo‘lishi kerak" })
  tableNumber: number;

  @ApiProperty({
    example: 4,
    description: "Stoldagi o‘rindiqlar soni",
  })
  @IsInt({ message: "seats butun son bo‘lishi kerak" })
  @Min(1, { message: "Kamida 1 ta o‘rindiq bo‘lishi kerak" })
  seats: number;

  @ApiProperty({
    example: 50000,
    description: "Stol narxi (so‘mda)",
  })
  @IsInt({ message: "price butun son bo‘lishi kerak" })
  @IsPositive({ message: "Narx musbat son bo‘lishi kerak" })
  price: number;

  @ApiProperty({
    example: true,
    description: "Stol maxsus (private) xonami?",
  })
  @IsBoolean({ message: "isPrivate true yoki false bo‘lishi kerak" })
  isPrivate: boolean;

  @ApiProperty({
    example: true,
    description: "Stol hozir mavjudmi?",
  })
  @IsBoolean({ message: "isAvialable true yoki false bo‘lishi kerak" })
  isAvialable: boolean;
}
