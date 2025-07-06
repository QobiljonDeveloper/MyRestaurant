import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { MenuService } from "./menu.service";
import { CreateMenuDto } from "./dto/create-menu.dto";
import { UpdateMenuDto } from "./dto/update-menu.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { Menu } from "./models/menu.model";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/role.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { ManagerRestaurantGuard } from "../common/guards/managerRestaurant.guard";

@ApiTags("Menu")
@Controller("menu")
export class MenuController {
  constructor(private readonly svc: MenuService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin", "manager")
  @Post()
  @ApiOperation({ summary: "Yangi taom yaratish" })
  @ApiResponse({ status: 201, description: "Yaratildi" })
  create(@Body() dto: CreateMenuDto) {
    return this.svc.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha taomlarni olish" })
  @ApiResponse({ status: 200, type: [Menu] })
  findAll() {
    return this.svc.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha taom olish" })
  @ApiResponse({ status: 200, type: Menu })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 404, description: "Topilmadi" })
  findOne(@Param("id") id: string) {
    return this.svc.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard, ManagerRestaurantGuard)
  @Roles("admin", "manager")
  @Patch(":id")
  @ApiOperation({ summary: "Taomni yangilash" })
  @ApiResponse({ status: 200, type: Menu })
  @ApiResponse({ status: 404, description: "Topilmadi" })
  update(@Param("id") id: string, @Body() dto: UpdateMenuDto) {
    return this.svc.update(+id, dto);
  }

  @UseGuards(AuthGuard, RolesGuard, ManagerRestaurantGuard)
  @Roles("admin", "manager")
  @Delete(":id")
  @ApiOperation({ summary: "Taomni o‘chirish" })
  @ApiResponse({ status: 200, description: "O‘chirildi" })
  @ApiResponse({ status: 404, description: "Topilmadi" })
  remove(@Param("id") id: string) {
    return this.svc.remove(+id);
  }
}
