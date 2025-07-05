import { Module } from "@nestjs/common";
import { RegionsService } from "./regions.service";
import { RegionsController } from "./regions.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Region } from "./models/region.models";

@Module({
  imports: [SequelizeModule.forFeature([Region])],
  controllers: [RegionsController],
  providers: [RegionsService],
})
export class RegionsModule {}
