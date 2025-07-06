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
import { AnnouncementsService } from "./announcements.service";
import { CreateAnnouncementDto } from "./dto/create-announcement.dto";
import { UpdateAnnouncementDto } from "./dto/update-announcement.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Announcement } from "./models/announcement.model";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/role.guard";
import { Roles } from "../common/decorators/roles.decorator";

@ApiTags("Announcements")
@Controller("announcements")
export class AnnouncementsController {
  constructor(private readonly svc: AnnouncementsService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin")
  @Post()
  @ApiOperation({ summary: "Yangi eʼlon yaratish" })
  @ApiResponse({ status: 201, description: "Yaratildi", type: Announcement })
  create(@Body() dto: CreateAnnouncementDto) {
    return this.svc.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha eʼlonlarni olish" })
  @ApiResponse({ status: 200, type: [Announcement] })
  findAll() {
    return this.svc.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Eʼlonni ID bo‘yicha olish" })
  @ApiResponse({ status: 200, type: Announcement })
  @ApiResponse({ status: 404, description: "Topilmadi" })
  findOne(@Param("id") id: string) {
    return this.svc.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin")
  @Patch(":id")
  @ApiOperation({ summary: "Eʼlonni yangilash" })
  @ApiResponse({ status: 200, type: Announcement })
  @ApiResponse({ status: 404, description: "Topilmadi" })
  update(@Param("id") id: string, @Body() dto: UpdateAnnouncementDto) {
    return this.svc.update(+id, dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin")
  @Delete(":id")
  @ApiOperation({ summary: "Eʼlonni o‘chirish" })
  @ApiResponse({ status: 200, description: "O‘chirildi" })
  @ApiResponse({ status: 404, description: "Topilmadi" })
  remove(@Param("id") id: string) {
    return this.svc.remove(+id);
  }
}
