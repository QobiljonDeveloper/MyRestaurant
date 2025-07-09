import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  BadRequestException,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { Request } from "express";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { User, UserRole } from "./models/user.model";
import { AuthGuard } from "../common/guards/auth.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesGuard } from "../common/guards/role.guard";
import { SelfGuard } from "../common/guards/self.guard";
import { IsCreatorGuard } from "../common/guards/isCreator.guard";
import { CreateUserDto } from "./dto/create-user.dto";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin")
  @Get()
  @ApiOperation({ summary: "Barcha foydalanuvchilar (admin only)" })
  @ApiResponse({ status: 200, type: [User] })
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin")
  @Get("managers/pending")
  getPendingManagers() {
    return this.usersService.getPendingManagers();
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Get(":id")
  @ApiOperation({
    summary: "Foydalanuvchini ID orqali ko‘rish (o‘zi yoki admin)",
  })
  @ApiResponse({ status: 200, type: User })
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Foydalanuvchini yangilash (o‘zi yoki admin)" })
  @ApiResponse({ status: 200, type: User })
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin")
  @Delete(":id")
  @ApiOperation({ summary: "Foydalanuvchini o‘chirish (admin only)" })
  @ApiResponse({ status: 200, description: "O‘chirildi" })
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
  @Post("create-admin")
  @UseGuards(AuthGuard, IsCreatorGuard)
  createAdmin(@Body() dto: CreateUserDto) {
    return this.usersService.createAdmin(dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin")
  @Patch("managers/:id/approve")
  approveManager(@Param("id") id: number) {
    return this.usersService.approveManager(id);
  }
}
