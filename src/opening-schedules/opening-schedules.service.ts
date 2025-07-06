import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateOpeningScheduleDto } from "./dto/create-opening-schedule.dto";
import { UpdateOpeningScheduleDto } from "./dto/update-opening-schedule.dto";
import { OpeningSchedule } from "./models/opening-schedule.model";
import { Restaurant } from "../restaurants/models/restaurant.model";

@Injectable()
export class OpeningSchedulesService {
  constructor(
    @InjectModel(OpeningSchedule)
    private openingScheduleModel: typeof OpeningSchedule,

    @InjectModel(Restaurant)
    private restaurantModel: typeof Restaurant
  ) {}

  async create(createDto: CreateOpeningScheduleDto) {
    const restaurant = await this.restaurantModel.findByPk(
      createDto.restaurantId
    );
    if (!restaurant) {
      throw new NotFoundException(
        `Restoran topilmadi: ID ${createDto.restaurantId}`
      );
    }

    const schedule = await this.openingScheduleModel.create(createDto);
    return schedule;
  }

  async findAll() {
    return this.openingScheduleModel.findAll({ include: [Restaurant] });
  }

  async findOne(id: number) {
    const schedule = await this.openingScheduleModel.findByPk(id, {
      include: [Restaurant],
    });
    if (!schedule) {
      throw new NotFoundException(`Jadval topilmadi: ID ${id}`);
    }
    return schedule;
  }

  async update(id: number, updateDto: UpdateOpeningScheduleDto) {
    const schedule = await this.openingScheduleModel.findByPk(id);
    if (!schedule) {
      throw new NotFoundException(`Jadval topilmadi: ID ${id}`);
    }
    return schedule.update(updateDto);
  }

  async remove(id: number) {
    const schedule = await this.openingScheduleModel.findByPk(id);
    if (!schedule) {
      throw new NotFoundException(`Jadval topilmadi: ID ${id}`);
    }
    await schedule.destroy();
    return { message: `Jadval o‘chirildi: ID ${id}` };
  }
}
