import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { OpeningSchedulesService } from "./opening-schedules.service";
import { CreateOpeningScheduleDto } from "./dto/create-opening-schedule.dto";
import { UpdateOpeningScheduleDto } from "./dto/update-opening-schedule.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { OpeningSchedule } from "./models/opening-schedule.model";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/role.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { ManagerRestaurantGuard } from "../common/guards/managerRestaurant.guard";

@ApiTags("Opening Schedules")
@Controller("opening-schedules")
export class OpeningSchedulesController {
  constructor(private readonly svc: OpeningSchedulesService) {}

  @UseGuards(AuthGuard, RolesGuard, ManagerRestaurantGuard)
  @Roles("admin", "manager")
  @Post()
  @ApiOperation({ summary: "Yangi jadval yaratish" })
  @ApiResponse({ status: 201, type: OpeningSchedule })
  create(@Body() dto: CreateOpeningScheduleDto) {
    return this.svc.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha jadvallar" })
  @ApiResponse({ status: 200, type: [OpeningSchedule] })
  findAll() {
    return this.svc.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha jadval" })
  @ApiResponse({ status: 200, type: OpeningSchedule })
  @ApiResponse({ status: 404, description: "Topilmadi" })
  findOne(@Param("id") id: string) {
    return this.svc.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard, ManagerRestaurantGuard)
  @Roles("admin", "manager")
  @Patch(":id")
  @ApiOperation({ summary: "Jadvalni yangilash" })
  @ApiResponse({ status: 200, type: OpeningSchedule })
  update(@Param("id") id: string, @Body() dto: UpdateOpeningScheduleDto) {
    return this.svc.update(+id, dto);
  }

  @UseGuards(AuthGuard, RolesGuard, ManagerRestaurantGuard)
  @Roles("admin", "manager")
  @Delete(":id")
  @ApiOperation({ summary: "Jadvalni o‘chirish" })
  remove(@Param("id") id: string) {
    return this.svc.remove(+id);
  }
}
