import { IsInt, IsString, Length, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateDistrictDto {
  @ApiProperty({
    example: "Chilonzor",
    description: "Tuman (district) nomi, maksimal 20 ta belgidan iborat",
  })
  @IsString({ message: "Tuman nomi matn bo‘lishi kerak" })
  @Length(2, 20, {
    message: "Tuman nomi 2 tadan 20 tagacha belgidan iborat bo‘lishi kerak",
  })
  name: string;

  @ApiProperty({
    example: 1,
    description:
      "Region ID, bu tuman qaysi regionga tegishli ekanini bildiradi",
  })
  @IsInt({ message: "Region ID butun son bo‘lishi kerak" })
  @Min(1, { message: "Region ID 1 dan katta bo‘lishi kerak" })
  regionId: number;
}
