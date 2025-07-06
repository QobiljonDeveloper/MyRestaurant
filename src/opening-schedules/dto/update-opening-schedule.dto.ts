import { PartialType } from '@nestjs/swagger';
import { CreateOpeningScheduleDto } from './create-opening-schedule.dto';

export class UpdateOpeningScheduleDto extends PartialType(CreateOpeningScheduleDto) {}
