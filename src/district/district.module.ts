import { Module } from "@nestjs/common";
import { DistrictService } from "./district.service";
import { DistrictController } from "./district.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { District } from "./models/district.model";
import { AuthModule } from "../auth/auth.module"; 

@Module({
  imports: [
    SequelizeModule.forFeature([District]),
    AuthModule,
  ],
  controllers: [DistrictController],
  providers: [DistrictService],
})
export class DistrictModule {}
