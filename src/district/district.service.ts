import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { District } from "./models/district.model";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";

@Injectable()
export class DistrictService {
  constructor(@InjectModel(District) private districtRepo: typeof District) {}

  async create(dto: CreateDistrictDto) {
    const exists = await this.districtRepo.findOne({
      where: {
        name: dto.name,
        regionId: dto.regionId,
      },
    });

    if (exists) {
      throw new ConflictException(
        "Bu nomdagi tuman ushbu regionda allaqachon mavjud"
      );
    }

    const district = await this.districtRepo.create(dto);
    return { message: "District yaratildi", data: district };
  }

  async findAll() {
    const districts = await this.districtRepo.findAll({
      include: { all: true },
    });
    return { count: districts.length, data: districts };
  }

  async findOne(id: number) {
    const district = await this.districtRepo.findByPk(id, {
      include: { all: true },
    });
    if (!district) {
      throw new NotFoundException("District topilmadi");
    }
    return district;
  }

  async update(id: number, dto: UpdateDistrictDto) {
    const district = await this.districtRepo.findByPk(id);
    if (!district) {
      throw new NotFoundException("District topilmadi");
    }

    if (
      (dto.name && dto.name !== district.name) ||
      (dto.regionId && dto.regionId !== district.regionId)
    ) {
      const duplicate = await this.districtRepo.findOne({
        where: {
          name: dto.name ?? district.name,
          regionId: dto.regionId ?? district.regionId,
        },
      });

      if (duplicate && duplicate.id !== id) {
        throw new ConflictException(
          "Bu nomdagi tuman ushbu regionda allaqachon mavjud"
        );
      }
    }

    await district.update(dto);
    return { message: "District yangilandi", data: district };
  }

  async remove(id: number) {
    const district = await this.districtRepo.findByPk(id);
    if (!district) {
      throw new NotFoundException("District topilmadi");
    }

    await district.destroy();
    return { message: "District o‘chirildi" };
  }
}
