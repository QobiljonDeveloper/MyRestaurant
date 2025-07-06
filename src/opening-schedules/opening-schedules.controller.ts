import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { OpeningSchedulesService } from "./opening-schedules.service";
import { CreateOpeningScheduleDto } from "./dto/create-opening-schedule.dto";
import { UpdateOpeningScheduleDto } from "./dto/update-opening-schedule.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { OpeningSchedule } from "./models/opening-schedule.model";

@ApiTags("Opening Schedules")
@Controller("opening-schedules")
export class OpeningSchedulesController {
  constructor(
    private readonly openingSchedulesService: OpeningSchedulesService
  ) {}

  @Post()
  @ApiOperation({ summary: "Yangi ish vaqti jadvalini yaratish" })
  @ApiResponse({
    status: 201,
    description: "Yangi jadval yaratildi",
    type: OpeningSchedule,
  })
  @ApiResponse({ status: 404, description: "Restoran topilmadi" })
  create(@Body() createDto: CreateOpeningScheduleDto) {
    return this.openingSchedulesService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha ish vaqti jadvallarini olish" })
  @ApiResponse({
    status: 200,
    description: "Jadvallar ro‘yxati",
    type: [OpeningSchedule],
  })
  findAll() {
    return this.openingSchedulesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Bitta jadvalni olish" })
  @ApiResponse({
    status: 200,
    description: "Topilgan jadval",
    type: OpeningSchedule,
  })
  @ApiResponse({ status: 404, description: "Jadval topilmadi" })
  findOne(@Param("id") id: string) {
    return this.openingSchedulesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Jadvalni tahrirlash" })
  @ApiResponse({
    status: 200,
    description: "Jadval muvaffaqiyatli yangilandi",
    type: OpeningSchedule,
  })
  @ApiResponse({ status: 404, description: "Jadval topilmadi" })
  update(@Param("id") id: string, @Body() updateDto: UpdateOpeningScheduleDto) {
    return this.openingSchedulesService.update(+id, updateDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Jadvalni o‘chirish" })
  @ApiResponse({
    status: 200,
    description: "Jadval o‘chirildi",
  })
  @ApiResponse({ status: 404, description: "Jadval topilmadi" })
  remove(@Param("id") id: string) {
    return this.openingSchedulesService.remove(+id);
  }
}
