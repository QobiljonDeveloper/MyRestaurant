import { Module } from '@nestjs/common';
import { OpeningSchedulesService } from './opening-schedules.service';
import { OpeningSchedulesController } from './opening-schedules.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OpeningSchedule } from './models/opening-schedule.model';
import { Restaurant } from '../restaurants/models/restaurant.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([OpeningSchedule, Restaurant]),
    AuthModule,
  ],
  controllers: [OpeningSchedulesController],
  providers: [OpeningSchedulesService],
})
export class OpeningSchedulesModule {}
