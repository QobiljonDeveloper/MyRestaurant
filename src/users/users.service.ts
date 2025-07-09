import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserRole } from "./models/user.model";
import { Op } from "sequelize";
import { Payment } from "../payments/models/payment.model";
import { Favorite } from "../favorites/models/favorite.model";
import { Reservation } from "../reservation/models/reservation.model";
import { Review } from "../reviews/models/review.model";
import { Restaurant } from "../restaurants/models/restaurant.model";
import { Tables } from "../tables/models/table.model";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, phone } = createUserDto;

    const existingUser = await this.userModel.findOne({
      where: {
        [Op.or]: [{ email }, { phone }],
      },
    });

    if (existingUser) {
      throw new BadRequestException("Bunday foydalanuvchi allaqachon mavjud");
    }

    return this.userModel.create(createUserDto);
  }

  async createAdmin(createUserDto: CreateUserDto): Promise<User> {
    const { email, phone } = createUserDto;

    const existingUser = await this.userModel.findOne({
      where: {
        [Op.or]: [{ email }, { phone }],
      },
    });

    if (existingUser) {
      throw new BadRequestException("Bunday foydalanuvchi allaqachon mavjud");
    }

    const newAdmin = await this.userModel.create({
      ...createUserDto,
      role: UserRole.ADMIN,
    });

    return newAdmin;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll({
      attributes: ["name", "email", "role", "phone"],
      include: [
        {
          model: Restaurant,
          attributes: ["id", "name", "location"],
          include: [
            {
              association: "district",
              attributes: ["id", "name"],
            },
            {
              association: "user",
              attributes: ["id", "name", "email"],
            },
          ],
        },
        {
          model: Review,
          attributes: ["id", "comment", "rating"],
        },
        {
          model: Reservation,
          attributes: ["id", "guestCount", "time", "status"],
          include: [
            {
              model: Tables,
              attributes: ["id", "tableNumber", "price"],
            },
            {
              model: Restaurant,
              attributes: ["id", "name", "location"],
            },
            {
              model: User,
              attributes: ["id", "name", "email"],
            },
          ],
        },

        {
          model: Favorite,
          attributes: ["id"],
          include: [
            {
              association: "restaurant",
              attributes: ["id", "name"],
            },
          ],
        },
        {
          model: Payment,
          attributes: ["id", "amount", "method", "status"],
          include: [
            {
              association: "restaurant",
              attributes: ["id", "name"],
            },
            {
              association: "reservation",
              attributes: ["id", "time"],
            },
          ],
        },
      ],
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id, {
      attributes: ["name", "email", "role", "phone"],
      include: [
        {
          model: Restaurant,
          attributes: ["id", "name", "location"],
          include: [
            {
              association: "district",
              attributes: ["id", "name"],
            },
            {
              association: "user",
              attributes: ["id", "name", "email"],
            },
          ],
        },
        {
          model: Review,
          attributes: ["id", "comment", "rating"],
        },
        {
          model: Reservation,
          attributes: ["id", "guestCount", "time", "status"],
          include: [
            {
              model: Tables,
              attributes: ["id", "tableNumber", "price"],
            },
            {
              model: Restaurant,
              attributes: ["id", "name", "location"],
            },
            {
              model: User,
              attributes: ["id", "name", "email"],
            },
          ],
        },

        {
          model: Favorite,
          attributes: ["id"],
          include: [
            {
              association: "restaurant",
              attributes: ["id", "name"],
            },
          ],
        },
        {
          model: Payment,
          attributes: ["id", "amount", "method", "status"],
          include: [
            {
              association: "restaurant",
              attributes: ["id", "name"],
            },
            {
              association: "reservation",
              attributes: ["id", "time"],
            },
          ],
        },
      ],
    });
    if (!user) {
      throw new NotFoundException("Foydalanuvchi topilmadi");
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    const { confirm_password, activation_link, ...safeData } =
      updateUserDto as any;

    return await user.update(safeData);
  }

  async remove(id: number): Promise<{ message: string }> {
    const user = await this.findOne(id);
    await user.destroy();
    return { message: "Foydalanuvchi o‘chirildi" };
  }

  async findUserByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  async updateRefreshToken(userId: number, refreshToken: string | null) {
    const user = await this.userModel.findByPk(userId);
    if (!user) return null;
    user.refresh_token = refreshToken;
    return user.save();
  }

  async findByActivationLink(link: string): Promise<User | null> {
    return this.userModel.findOne({
      where: { activation_link: link },
    });
  }

  async getPendingManagers(): Promise<User[]> {
    return this.userModel.findAll({
      where: {
        role: UserRole.MANAGER,
        is_active: false,
        email_confirmed: true,
      },
    });
  }
  async approveManager(id: number): Promise<{ message: string }> {
    const user = await this.findOne(id);

    if (user.role !== UserRole.MANAGER) {
      throw new BadRequestException("Faqat managerlarni tasdiqlash mumkin");
    }

    if (!user.email_confirmed) {
      throw new BadRequestException("Manager hali emailni tasdiqlamagan");
    }

    user.is_active = true;
    await user.save();

    return { message: "Manager akkaunti faollashtirildi" };
  }
}
