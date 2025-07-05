import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { DistrictService } from "./district.service";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { District } from "./models/district.model";

@ApiTags("Districts")
@Controller("district")
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @ApiOperation({ summary: "Yangi tuman yaratish" })
  @ApiResponse({ status: 201, description: "Tuman yaratildi", type: District })
  @ApiResponse({
    status: 409,
    description: "Bu nomdagi tuman ushbu regionda mavjud",
  })
  @Post()
  create(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtService.create(createDistrictDto);
  }

  @ApiOperation({ summary: "Barcha tumanlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Tumanlar ro‘yxati",
    type: [District],
  })
  @Get()
  findAll() {
    return this.districtService.findAll();
  }

  @ApiOperation({ summary: "ID orqali tuman olish" })
  @ApiResponse({ status: 200, description: "Tuman topildi", type: District })
  @ApiResponse({ status: 404, description: "Tuman topilmadi" })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.districtService.findOne(id);
  }

  @ApiOperation({ summary: "Tuman maʼlumotlarini yangilash" })
  @ApiResponse({ status: 200, description: "Tuman yangilandi", type: District })
  @ApiResponse({ status: 404, description: "Tuman topilmadi" })
  @ApiResponse({ status: 409, description: "Takroriy nom" })
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateDistrictDto: UpdateDistrictDto
  ) {
    return this.districtService.update(id, updateDistrictDto);
  }

  @ApiOperation({ summary: "Tumanni o‘chirish" })
  @ApiResponse({ status: 200, description: "Tuman o‘chirildi" })
  @ApiResponse({ status: 404, description: "Tuman topilmadi" })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.districtService.remove(id);
  }
}
