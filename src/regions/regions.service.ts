import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Region } from "./models/region.models";
import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { District } from "../district/models/district.model";

@Injectable()
export class RegionsService {
  constructor(
    @InjectModel(Region) private readonly regionRepo: typeof Region
  ) {}

  async create(createRegionDto: CreateRegionDto) {
    const exist = await this.regionRepo.findOne({
      where: { name: createRegionDto.name },
    });

    if (exist) {
      throw new ConflictException("Bu nomdagi region allaqachon yaratilgan");
    }

    const region = await this.regionRepo.create(createRegionDto);
    return { message: "Region yaratildi", data: region };
  }

  async findAll() {
    const regions = await this.regionRepo.findAll({
      attributes: ["id", "name"],
      include: [
        {
          model: District,
          attributes: ["id", "name"],
        },
      ],
    });
    return regions;
  }

  async findOne(id: number) {
    const region = await this.regionRepo.findByPk(id, {
      attributes: ["id", "name"],
      include: [
        {
          model: District,
          attributes: ["id", "name"],
        },
      ],
    });

    if (!region) {
      throw new NotFoundException("Region topilmadi");
    }
    return region;
  }

  async update(id: number, dto: UpdateRegionDto) {
    const region = await this.regionRepo.findByPk(id);
    if (!region) {
      throw new NotFoundException("Region topilmadi");
    }

    if (dto.name && dto.name !== region.name) {
      const duplicate = await this.regionRepo.findOne({
        where: { name: dto.name },
      });
      if (duplicate) {
        throw new ConflictException("Bunday nomdagi region allaqachon mavjud");
      }
    }

    await region.update(dto);
    return { message: "Region yangilandi", data: region };
  }

  async remove(id: number) {
    const region = await this.regionRepo.findByPk(id);
    if (!region) {
      throw new NotFoundException("Region topilmadi");
    }

    await region.destroy();
    return { message: "Region o‘chirildi" };
  }
}
