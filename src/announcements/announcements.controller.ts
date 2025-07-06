import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AnnouncementsService } from "./announcements.service";
import { CreateAnnouncementDto } from "./dto/create-announcement.dto";
import { UpdateAnnouncementDto } from "./dto/update-announcement.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Announcement } from "./models/announcement.model";

@ApiTags("Announcements")
@Controller("announcements")
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi eʼlon yaratish" })
  @ApiResponse({
    status: 201,
    description: "Yangi eʼlon muvaffaqiyatli yaratildi",
    type: Announcement,
  })
  create(@Body() createAnnouncementDto: CreateAnnouncementDto) {
    return this.announcementsService.create(createAnnouncementDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha eʼlonlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha eʼlonlar ro‘yxati",
    type: [Announcement],
  })
  findAll() {
    return this.announcementsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Eʼlonni ID orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Topilgan eʼlon",
    type: Announcement,
  })
  @ApiResponse({ status: 404, description: "Eʼlon topilmadi" })
  findOne(@Param("id") id: string) {
    return this.announcementsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Eʼlonni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Eʼlon muvaffaqiyatli yangilandi",
    type: Announcement,
  })
  @ApiResponse({ status: 404, description: "Eʼlon topilmadi" })
  update(
    @Param("id") id: string,
    @Body() updateAnnouncementDto: UpdateAnnouncementDto
  ) {
    return this.announcementsService.update(+id, updateAnnouncementDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Eʼlonni o‘chirish" })
  @ApiResponse({
    status: 200,
    description: "Eʼlon muvaffaqiyatli o‘chirildi",
  })
  @ApiResponse({ status: 404, description: "Eʼlon topilmadi" })
  remove(@Param("id") id: string) {
    return this.announcementsService.remove(+id);
  }
}
