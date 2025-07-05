import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Req,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SigninUserDto } from "../users/dto/sign-in.dto";
import { Response, Request } from "express";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  @ApiOperation({ summary: "Yangi foydalanuvchi ro‘yxatdan o‘tadi" })
  @ApiResponse({ status: 201, description: "Foydalanuvchi ro‘yxatdan o‘tdi" })
  signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(200)
  @Post("signin")
  @ApiOperation({ summary: "Foydalanuvchini tizimga kirgizish" })
  @ApiResponse({ status: 200, description: "Tokenlar yuborildi" })
  signin(
    @Body() dto: SigninUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signin(dto, res);
  }

  @HttpCode(200)
  @Post("logout")
  @ApiOperation({ summary: "Tizimdan chiqish (logout)" })
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const token = req.cookies?.refreshToken;
    return this.authService.logout(token, res);
  }

  @HttpCode(200)
  @Post(":id/refresh")
  @ApiOperation({ summary: "Refresh token orqali access tokenni yangilash" })
  refresh(
    @Param("id", ParseIntPipe) id: number,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const refreshToken = req.cookies?.refreshToken;
    return this.authService.refreshToken(id, refreshToken, res);
  }

  @Get("activate/:link")
  @ApiOperation({
    summary: "Email orqali yuborilgan activation linkni faollashtirish",
  })
  activate(@Param("link") link: string) {
    return this.authService.activate(link);
  }
}
