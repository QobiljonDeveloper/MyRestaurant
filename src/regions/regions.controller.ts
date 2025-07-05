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
import { RegionsService } from "./regions.service";
import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Region } from "./models/region.models";

@ApiTags("Regions")
@Controller("regions")
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @ApiOperation({ summary: "Yangi region yaratish" })
  @ApiResponse({ status: 201, description: "Region yaratildi", type: Region })
  @ApiResponse({ status: 409, description: "Bu region nomi allaqachon mavjud" })
  @Post()
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionsService.create(createRegionDto);
  }

  @ApiOperation({ summary: "Barcha regionlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Regionlar ro‘yxati",
    type: [Region],
  })
  @Get()
  findAll() {
    return this.regionsService.findAll();
  }

  @ApiOperation({ summary: "ID orqali bitta regionni olish" })
  @ApiResponse({
    status: 200,
    description: "Region topildi",
    type: Region,
  })
  @ApiResponse({ status: 404, description: "Region topilmadi" })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.regionsService.findOne(id);
  }

  @ApiOperation({ summary: "Regionni yangilash" })
  @ApiResponse({ status: 200, description: "Region yangilandi", type: Region })
  @ApiResponse({ status: 404, description: "Region topilmadi" })
  @ApiResponse({ status: 409, description: "Nom takrorlangan" })
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRegionDto: UpdateRegionDto
  ) {
    return this.regionsService.update(id, updateRegionDto);
  }

  @ApiOperation({ summary: "Regionni o‘chirish" })
  @ApiResponse({ status: 200, description: "Region o‘chirildi" })
  @ApiResponse({ status: 404, description: "Region topilmadi" })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.regionsService.remove(id);
  }
}
