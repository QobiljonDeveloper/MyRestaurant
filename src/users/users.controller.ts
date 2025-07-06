import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { User } from "./models/user.model";
import { AuthGuard } from "../common/guards/auth.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesGuard } from "../common/guards/role.guard";
import { SelfGuard } from "../common/guards/self.guard";

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
}
