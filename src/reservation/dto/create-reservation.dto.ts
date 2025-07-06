import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsEnum, Min, IsNotEmpty } from "class-validator";
import { ReservationStatus } from "../models/reservation.model";

export class CreateReservationDto {
  @ApiProperty({
    example: 1,
    description: "Bandlov qilgan foydalanuvchining ID raqami",
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example: 3,
    description: "Band qilingan stol ID raqami",
  })
  @IsNumber()
  @IsNotEmpty()
  tableId: number;

  @ApiProperty({
    example: 2,
    description: "Restoran ID raqami",
  })
  @IsNumber()
  @IsNotEmpty()
  restaurantId: number;

  @ApiProperty({
    example: "2025-07-06T18:30:00Z",
    description: "Bandlov vaqti (ISO 8601 formatda)",
  })
  @IsNotEmpty()
  time: string;

  @ApiProperty({
    example: 4,
    description: "Mehmonlar soni (kamida 1)",
  })
  @IsNumber()
  @Min(1)
  guestCount: number;

  @ApiProperty({
    example: ReservationStatus.PENDING,
    description: "Bandlov holati: pending, confirmed yoki cancelled",
    enum: ReservationStatus,
  })
  @IsEnum(ReservationStatus)
  status: ReservationStatus;
}
