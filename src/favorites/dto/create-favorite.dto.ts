import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNotEmpty } from "class-validator";

export class CreateFavoriteDto {
  @ApiProperty({
    example: 3,
    description: "Foydalanuvchi ID raqami",
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example: 5,
    description: "Restoran ID raqami",
  })
  @IsNumber()
  @IsNotEmpty()
  restaurantId: number;
}
