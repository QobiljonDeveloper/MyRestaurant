import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateMenuCategoryDto } from "./dto/create-menu-category.dto";
import { UpdateMenuCategoryDto } from "./dto/update-menu-category.dto";
import { MenuCategory } from "./models/menu-category.model";
import { Restaurant } from "../restaurants/models/restaurant.model";

@Injectable()
export class MenuCategoriesService {
  constructor(
    @InjectModel(MenuCategory)
    private menuCategoryModel: typeof MenuCategory,

    @InjectModel(Restaurant)
    private restaurantModel: typeof Restaurant
  ) {}

  async create(dto: CreateMenuCategoryDto) {
    const restaurant = await this.restaurantModel.findByPk(dto.restaurantId);
    if (!restaurant) {
      throw new NotFoundException("Bunday restoran mavjud emas");
    }

    const existing = await this.menuCategoryModel.findOne({
      where: {
        restaurantId: dto.restaurantId,
        name: dto.name,
      },
    });

    if (existing) {
      throw new BadRequestException("Bu nomli kategoriya allaqachon mavjud");
    }

    return this.menuCategoryModel.create(dto);
  }

  async findAll() {
    return this.menuCategoryModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const category = await this.menuCategoryModel.findByPk(id, {
      include: { all: true },
    });
    if (!category) {
      throw new NotFoundException("Kategoriya topilmadi");
    }
    return category;
  }

  async update(id: number, dto: UpdateMenuCategoryDto) {
    const category = await this.menuCategoryModel.findByPk(id);
    if (!category) {
      throw new NotFoundException("Kategoriya topilmadi");
    }

    // Optional: nom takrorlanmasligi uchun tekshiruv
    if (dto.name && dto.restaurantId) {
      const exists = await this.menuCategoryModel.findOne({
        where: {
          name: dto.name,
          restaurantId: dto.restaurantId,
          id: { $ne: id },
        },
      });

      if (exists) {
        throw new BadRequestException("Yangi nom allaqachon mavjud");
      }
    }

    return category.update(dto);
  }

  async remove(id: number) {
    const category = await this.menuCategoryModel.findByPk(id);
    if (!category) {
      throw new NotFoundException("Kategoriya topilmadi");
    }
    await category.destroy();
    return { message: "Kategoriya o‘chirildi" };
  }
}
