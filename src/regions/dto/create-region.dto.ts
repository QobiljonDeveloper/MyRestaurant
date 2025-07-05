import { IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRegionDto {
  @ApiProperty({
    example: "Toshkent",
    description:
      "Hudud (region) nomi, maksimum 20 ta belgidan iborat bo'lishi kerak",
  })
  @IsString({ message: "Region nomi matn bo‘lishi kerak" })
  @Length(2, 20, {
    message: "Region nomi 2 tadan 20 tagacha belgidan iborat bo‘lishi kerak",
  })
  name: string;
}
