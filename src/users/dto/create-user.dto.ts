import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MinLength,
} from "class-validator";
import { UserRole } from "../models/user.model";

export class CreateUserDto {
  @ApiProperty({ example: "Ali Valiyev", description: "Foydalanuvchi ismi" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "ali@example.com", description: "Email manzili" })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "P@ssw0rd!",
    description: "Parol (kamida 6ta belgi)",
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: "P@ssw0rd!",
    description: "Parolni tasdiqlash",
  })
  @IsString()
  @MinLength(6)
  confirm_password: string;

  @ApiProperty({ example: "+998901234567", description: "Telefon raqami" })
  @IsPhoneNumber("UZ")
  phone: string;

  @ApiProperty({
    example: UserRole.CUSTOMER,
    enum: UserRole,
    description: "Foydalanuvchi roli",
  })
  activation_link: boolean;
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({
    example: false,
    description: "Foydalanuvchi creator ekanligi",
    required: false,
  })
  @IsOptional()
  isCreator?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  email_confirmed?: boolean;
}
