import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, Min } from "class-validator";
import { PaymentMethodsEnum, PaymentStatusEnum } from "../models/payment.model";

export class CreatePaymentDto {
  @ApiProperty({ example: 1, description: "Foydalanuvchi ID raqami" })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 10, description: "Restoran ID raqami" })
  @IsInt()
  @IsNotEmpty()
  restaurantId: number;

  @ApiProperty({ example: 3, description: "Bron ID raqami" })
  @IsInt()
  @IsNotEmpty()
  reservationId: number;

  @ApiProperty({ example: 250000, description: "Toʻlov summasi" })
  @IsInt()
  @Min(1)
  amount: number;

  @ApiProperty({
    example: PaymentMethodsEnum.CARD,
    enum: PaymentMethodsEnum,
    description: "Toʻlov turi",
  })
  @IsEnum(PaymentMethodsEnum)
  method: PaymentMethodsEnum;

  @ApiProperty({
    example: PaymentStatusEnum.PENDING,
    enum: PaymentStatusEnum,
    description: "Toʻlov holati",
  })
  @IsEnum(PaymentStatusEnum)
  status: PaymentStatusEnum;
}
