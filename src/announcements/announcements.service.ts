import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateAnnouncementDto } from "./dto/create-announcement.dto";
import { UpdateAnnouncementDto } from "./dto/update-announcement.dto";
import { Announcement } from "./models/announcement.model";
import { Restaurant } from "../restaurants/models/restaurant.model";

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectModel(Announcement)
    private announcementModel: typeof Announcement,
    @InjectModel(Restaurant)
    private restaurantModel: typeof Restaurant
  ) {}

  async create(createAnnouncementDto: CreateAnnouncementDto) {
    const { restaurantId } = createAnnouncementDto;

    const restaurant = await this.restaurantModel.findByPk(restaurantId);
    if (!restaurant) {
      throw new NotFoundException(`Restoran topilmadi: ID ${restaurantId}`);
    }

    const announcement = await this.announcementModel.create(
      createAnnouncementDto
    );
    return announcement;
  }

  async findAll() {
    return this.announcementModel.findAll({
      include: [Restaurant],
    });
  }

  async findOne(id: number) {
    const announcement = await this.announcementModel.findByPk(id, {
      include: [Restaurant],
    });
    if (!announcement) {
      throw new NotFoundException(`Eʼlon topilmadi: ID ${id}`);
    }
    return announcement;
  }

  async update(id: number, updateAnnouncementDto: UpdateAnnouncementDto) {
    const announcement = await this.announcementModel.findByPk(id);
    if (!announcement) {
      throw new NotFoundException(`Eʼlon topilmadi: ID ${id}`);
    }
    return announcement.update(updateAnnouncementDto);
  }

  async remove(id: number) {
    const announcement = await this.announcementModel.findByPk(id);
    if (!announcement) {
      throw new NotFoundException(`Eʼlon topilmadi: ID ${id}`);
    }
    await announcement.destroy();
    return { message: `Eʼlon o‘chirildi: ID ${id}` };
  }
}
