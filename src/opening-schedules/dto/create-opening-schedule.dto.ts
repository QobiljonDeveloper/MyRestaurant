import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  Matches,
} from "class-validator";
import { DaysOfWeekEnum } from "../models/opening-schedule.model";

export class CreateOpeningScheduleDto {
  @ApiProperty({ example: 5, description: "Restoran ID raqami" })
  @IsNumber()
  @IsNotEmpty()
  restaurantId: number;

  @ApiProperty({
    example: DaysOfWeekEnum.JUMA,
    enum: DaysOfWeekEnum,
    description: "Haftaning kuni (o‘zbek tilida)",
  })
  @IsEnum(DaysOfWeekEnum)
  dayOfWeek: DaysOfWeekEnum;

  @ApiProperty({ example: true, description: "Restoran ochiqmi yoki yo‘q" })
  @IsBoolean()
  isOpen: boolean;

  @ApiProperty({ example: "09:00", description: "Ochilish vaqti (HH:mm)" })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "openAt must be in HH:mm format",
  })
  openAt: string;

  @ApiProperty({ example: "21:00", description: "Yopilish vaqti (HH:mm)" })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "closeAt must be in HH:mm format",
  })
  closeAt: string;
}
