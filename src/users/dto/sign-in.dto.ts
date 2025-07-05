import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SigninUserDto {
  @ApiProperty({
    example: "ali@example.com",
    description: "Foydalanuvchining email manzili",
  })
  @IsEmail({}, { message: "Email noto‘g‘ri formatda" })
  @IsNotEmpty({ message: "Email bo‘sh bo‘lmasligi kerak" })
  readonly email: string;

  @ApiProperty({
    example: "P@ssw0rd!",
    description: "Foydalanuvchining paroli",
  })
  @IsString({ message: "Parol matn ko‘rinishida bo‘lishi kerak" })
  @MinLength(6, { message: "Parol kamida 6 ta belgidan iborat bo‘lishi kerak" })
  readonly password: string;
}
