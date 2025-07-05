import { Module } from "@nestjs/common";
import { MenuImagesService } from "./menu-images.service";
import { MenuImagesController } from "./menu-images.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { MenuImage } from "./models/menu-image.model";

@Module({
  imports: [SequelizeModule.forFeature([MenuImage])],
  controllers: [MenuImagesController],
  providers: [MenuImagesService],
})
export class MenuImagesModule {}
