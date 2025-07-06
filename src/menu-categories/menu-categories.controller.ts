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
import { MenuCategoriesService } from "./menu-categories.service";
import { CreateMenuCategoryDto } from "./dto/create-menu-category.dto";
import { UpdateMenuCategoryDto } from "./dto/update-menu-category.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { MenuCategory } from "./models/menu-category.model";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/role.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { ManagerRestaurantGuard } from "../common/guards/managerRestaurant.guard";

@ApiTags("Menu Categories")
@Controller("menu-categories")
export class MenuCategoriesController {
  constructor(private readonly svc: MenuCategoriesService) {}

  @UseGuards(AuthGuard, RolesGuard, ManagerRestaurantGuard)
  @Roles("admin", "manager")
  @Post()
  @ApiOperation({ summary: "Yangi kategoriya yaratish" })
  @ApiResponse({ status: 201, type: MenuCategory })
  create(@Body() dto: CreateMenuCategoryDto) {
    return this.svc.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha kategoriyalar" })
  @ApiResponse({ status: 200, type: [MenuCategory] })
  findAll() {
    return this.svc.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha kategoriya" })
  @ApiResponse({ status: 200, type: MenuCategory })
  @ApiResponse({ status: 404, description: "Topilmadi" })
  findOne(@Param("id") id: string) {
    return this.svc.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard, ManagerRestaurantGuard)
  @Roles("admin", "manager")
  @Patch(":id")
  @ApiOperation({ summary: "Kategoriya yangilash" })
  @ApiResponse({ status: 200, type: MenuCategory })
  update(@Param("id") id: string, @Body() dto: UpdateMenuCategoryDto) {
    return this.svc.update(+id, dto);
  }

  @UseGuards(AuthGuard, RolesGuard, ManagerRestaurantGuard)
  @Roles("admin", "manager")
  @Delete(":id")
  @ApiOperation({ summary: "Kategoriya o‘chirish" })
  remove(@Param("id") id: string) {
    return this.svc.remove(+id);
  }
}
