import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./models/user.model";
import { Op } from "sequelize";

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

  async findAll(): Promise<User[]> {
    return this.userModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id,{include:{all:true}});
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
}
