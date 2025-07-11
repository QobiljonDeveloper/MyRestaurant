import { Module } from "@nestjs/common";
import { AnnouncementsService } from "./announcements.service";
import { AnnouncementsController } from "./announcements.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Announcement } from "./models/announcement.model";
import { Restaurant } from "../restaurants/models/restaurant.model";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [SequelizeModule.forFeature([Announcement, Restaurant]), AuthModule],
  controllers: [AnnouncementsController],
  providers: [AnnouncementsService],
})
export class AnnouncementsModule {}
