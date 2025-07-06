import {
  Injectable,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SigninUserDto } from "../users/dto/sign-in.dto";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { MailService } from "../mail/mail.service";
import { UserRole } from "../users/models/user.model";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService
  ) {}

  async generateTokens(user: any) {
    const payload = {
      id: user.id,
      role: user.role,
      email: user.email,
      is_active: user.is_active,
      is_creator: user.isCreator,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async signup(dto: CreateUserDto) {
    if (dto.password !== dto.confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }

    // ROLE ADMIN BO'LSA RO'YXATDAN O'TISHNI TAQIQLASH
    if (dto.role && dto.role.toLowerCase() === "admin") {
      throw new ForbiddenException("Admin sifatida ro'yxatdan o'tib bo'lmaydi");
    }

    const existing = await this.usersService.findUserByEmail(dto.email);
    if (existing) {
      throw new ConflictException("Bu email allaqachon ro‘yxatdan o‘tgan");
    }

    const hash = await bcrypt.hash(dto.password, 7);
    const activation_link = uuidv4();

    const user = await this.usersService.create({
      ...dto,
      password: hash,
      activation_link,
      role: UserRole.CUSTOMER,
    });

    await this.mailService.sendMail(user);

    return {
      message: "Ro'yxatdan o'tdingiz. Email orqali tasdiqlang",
    };
  }

  async signin(dto: SigninUserDto, res: Response) {
    const user = await this.usersService.findUserByEmail(dto.email);

    if (!user) {
      throw new NotFoundException("Avval ro'yxatdan o'ting");
    }

    if (!user.is_active) {
      throw new ForbiddenException("Avval akkauntingizni faollashtiring");
    }

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) {
      throw new UnauthorizedException("Email yoki parol noto‘g‘ri");
    }

    const { accessToken, refreshToken } = await this.generateTokens(user);
    const hashedRefresh = await bcrypt.hash(refreshToken, 7);
    await this.usersService.updateRefreshToken(user.id, hashedRefresh);

    res.cookie("refreshToken", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return { message: "Kirish muvaffaqiyatli", accessToken, userId: user.id };
  }

  async logout(token: string, res: Response) {
    const userData = await this.jwtService
      .verifyAsync(token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      })
      .catch(() => {
        throw new UnauthorizedException();
      });

    if (!userData) throw new ForbiddenException("Ruxsat yo‘q");

    await this.usersService.updateRefreshToken(userData.id, null);
    res.clearCookie("refreshToken");

    return { message: "Tizimdan chiqdingiz" };
  }

  async refreshToken(userId: number, token: string, res: Response) {
    const user = await this.usersService.findOne(userId);
    if (!user || !user.refresh_token) throw new UnauthorizedException();

    const match = await bcrypt.compare(token, user.refresh_token);
    if (!match) throw new ForbiddenException("Refresh token mos emas");

    const { accessToken, refreshToken } = await this.generateTokens(user);
    const hashedRefresh = await bcrypt.hash(refreshToken, 7);
    await this.usersService.updateRefreshToken(userId, hashedRefresh);

    res.cookie("refreshToken", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return { message: "Yangi tokenlar berildi", accessToken };
  }

  async activate(link: string) {
    const user = await this.usersService.findByActivationLink(link);
    if (!user)
      throw new NotFoundException("Bunday aktivatsiya link mavjud emas");

    if (user.is_active) {
      return { message: "Akkount allaqachon faollashtirilgan" };
    }

    user.is_active = true;
    await user.save();

    return { message: "Akkount muvaffaqiyatli faollashtirildi" };
  }
}
