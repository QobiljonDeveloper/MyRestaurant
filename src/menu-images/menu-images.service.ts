import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { MenuImage } from "./models/menu-image.model";
import { CreateMenuImageDto } from "./dto/create-menu-image.dto";
import { UpdateMenuImageDto } from "./dto/update-menu-image.dto";

@Injectable()
export class MenuImagesService {
  constructor(
    @InjectModel(MenuImage) private menuImageRepo: typeof MenuImage
  ) {}

  async create(dto: CreateMenuImageDto) {
    if (dto.isMain) {
      await this.menuImageRepo.update(
        { isMain: false },
        { where: { menuId: dto.menuId, isMain: true } }
      );
    }

    return this.menuImageRepo.create(dto);
  }

  async findAll() {
    return this.menuImageRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const image = await this.menuImageRepo.findByPk(id, {
      include: { all: true },
    });
    if (!image) throw new NotFoundException("Menu rasm topilmadi");
    return image;
  }

  async update(id: number, dto: UpdateMenuImageDto) {
    const image = await this.menuImageRepo.findByPk(id);
    if (!image) throw new NotFoundException("Menu rasm topilmadi");

    if (dto.isMain) {
      await this.menuImageRepo.update(
        { isMain: false },
        { where: { menuId: image.menuId, isMain: true } }
      );
    }

    return image.update(dto);
  }

  async remove(id: number) {
    const image = await this.menuImageRepo.findByPk(id);
    if (!image) throw new NotFoundException("Menu rasm topilmadi");
    return image.destroy();
  }
}
