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
import { MenuImagesService } from "./menu-images.service";
import { CreateMenuImageDto } from "./dto/create-menu-image.dto";
import { UpdateMenuImageDto } from "./dto/update-menu-image.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { MenuImage } from "./models/menu-image.model";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/role.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { ManagerRestaurantGuard } from "../common/guards/managerRestaurant.guard";

@ApiTags("Menu Images")
@Controller("menu-images")
export class MenuImagesController {
  constructor(private readonly svc: MenuImagesService) {}

  @UseGuards(AuthGuard, RolesGuard, ManagerRestaurantGuard)
  @Roles("admin", "manager")
  @Post()
  @ApiOperation({ summary: "Yangi taom rasmi yaratish" })
  @ApiResponse({ status: 201, type: MenuImage })
  create(@Body() dto: CreateMenuImageDto) {
    return this.svc.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha rasmlar" })
  @ApiResponse({ status: 200, type: [MenuImage] })
  findAll() {
    return this.svc.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha rasm" })
  @ApiResponse({ status: 200, type: MenuImage })
  @ApiResponse({ status: 404, description: "Topilmadi" })
  findOne(@Param("id") id: string) {
    return this.svc.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard, ManagerRestaurantGuard)
  @Roles("admin", "manager")
  @Patch(":id")
  @ApiOperation({ summary: "Rasmni yangilash" })
  @ApiResponse({ status: 200, type: MenuImage })
  update(@Param("id") id: string, @Body() dto: UpdateMenuImageDto) {
    return this.svc.update(+id, dto);
  }

  @UseGuards(AuthGuard, RolesGuard, ManagerRestaurantGuard)
  @Roles("admin", "manager")
  @Delete(":id")
  @ApiOperation({ summary: "Rasmni o‘chirish" })
  remove(@Param("id") id: string) {
    return this.svc.remove(+id);
  }
}
