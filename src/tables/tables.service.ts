import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Tables } from "./models/table.model";
import { CreateTableDto } from "./dto/create-table.dto";
import { UpdateTableDto } from "./dto/update-table.dto";
import { Restaurant } from "../restaurants/models/restaurant.model";

@Injectable()
export class TablesService {
  constructor(
    @InjectModel(Tables) private tableRepo: typeof Tables,
    @InjectModel(Restaurant) private restaurantRepo: typeof Restaurant
  ) {}

  async create(dto: CreateTableDto) {
    const restaurant = await this.restaurantRepo.findByPk(dto.restaurantId);
    if (!restaurant) {
      throw new NotFoundException(`Bunday restoran mavjud emas`);
    }

    const exists = await this.tableRepo.findOne({
      where: {
        restaurantId: dto.restaurantId,
        tableNumber: dto.tableNumber,
      },
    });

    if (exists) {
      throw new ConflictException(
        `Bu restoran ichida ${dto.tableNumber}-raqamli stol allaqachon mavjud`
      );
    }

    const newTable = await this.tableRepo.create(dto);
    return { message: "Yangi stol yaratildi", data: newTable };
  }

  async findAll() {
    const tables = await this.tableRepo.findAll({ include: { all: true } });
    return tables;
  }

  async findOne(id: number) {
    const table = await this.tableRepo.findByPk(id, { include: { all: true } });
    if (!table) {
      throw new NotFoundException("Stol topilmadi");
    }
    return table;
  }

  async update(id: number, dto: UpdateTableDto) {
    const table = await this.tableRepo.findByPk(id);
    if (!table) {
      throw new NotFoundException("Stol topilmadi");
    }

    if (
      (dto.tableNumber && dto.tableNumber !== table.tableNumber) ||
      (dto.restaurantId && dto.restaurantId !== table.restaurantId)
    ) {
      const duplicate = await this.tableRepo.findOne({
        where: {
          restaurantId: dto.restaurantId ?? table.restaurantId,
          tableNumber: dto.tableNumber ?? table.tableNumber,
        },
      });

      if (duplicate && duplicate.id !== id) {
        throw new ConflictException(
          `Bu restoran ichida stol raqami allaqachon mavjud`
        );
      }
    }

    await table.update(dto);
    return { message: "Stol maʼlumotlari yangilandi", data: table };
  }

  async remove(id: number) {
    const table = await this.tableRepo.findByPk(id);
    if (!table) {
      throw new NotFoundException("Stol topilmadi");
    }

    await table.destroy();
    return { message: "Stol o‘chirildi" };
  }
}
