import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Menu } from "./models/menu.model";
import { CreateMenuDto } from "./dto/create-menu.dto";
import { UpdateMenuDto } from "./dto/update-menu.dto";
import { Restaurant } from "../restaurants/models/restaurant.model";
import { MenuCategory } from "../menu-categories/models/menu-category.model";

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Menu)
    private readonly menuModel: typeof Menu
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    const restaurant = await Restaurant.findByPk(createMenuDto.restaurantId);
    if (!restaurant) {
      throw new NotFoundException("Bunday restoran topilmadi");
    }

    const category = await MenuCategory.findByPk(createMenuDto.menuCategoryId);
    if (!category) {
      throw new NotFoundException("Bunday menu kategoriyasi topilmadi");
    }

    const exists = await this.menuModel.findOne({
      where: {
        name: createMenuDto.name,
        restaurantId: createMenuDto.restaurantId,
      },
    });

    if (exists) {
      throw new BadRequestException("Bu nomli taom ushbu restoranda mavjud");
    }

    return this.menuModel.create(createMenuDto);
  }

  async findAll() {
    return this.menuModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const menu = await this.menuModel.findByPk(id, { include: { all: true } });
    if (!menu) {
      throw new NotFoundException(`ID ${id} bo‘lgan taom topilmadi`);
    }
    return menu;
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const menu = await this.menuModel.findByPk(id);
    if (!menu) {
      throw new NotFoundException(`ID ${id} bo‘lgan taom topilmadi`);
    }

    if (
      updateMenuDto.name &&
      updateMenuDto.restaurantId &&
      (menu.name !== updateMenuDto.name ||
        menu.restaurantId !== updateMenuDto.restaurantId)
    ) {
      const exists = await this.menuModel.findOne({
        where: {
          name: updateMenuDto.name,
          restaurantId: updateMenuDto.restaurantId,
        },
      });
      if (exists) {
        throw new BadRequestException(
          "Bu nomli taom ushbu restoranda allaqachon mavjud"
        );
      }
    }

    return menu.update(updateMenuDto);
  }

  async remove(id: number) {
    const menu = await this.menuModel.findByPk(id);
    if (!menu) {
      throw new NotFoundException(`ID ${id} bo‘lgan taom topilmadi`);
    }
    return menu.destroy();
  }
}
