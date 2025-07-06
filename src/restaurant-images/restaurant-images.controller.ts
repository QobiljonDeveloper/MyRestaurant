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
import { RestaurantImagesService } from "./restaurant-images.service";
import { CreateRestaurantImageDto } from "./dto/create-restaurant-image.dto";
import { UpdateRestaurantImageDto } from "./dto/update-restaurant-image.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { RestaurantImage } from "./models/restaurant-image.model";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/role.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { ManagerRestaurantGuard } from "../common/guards/managerRestaurant.guard";

@ApiTags("Restaurant Images")
@Controller("restaurant-images")
export class RestaurantImagesController {
  constructor(private readonly svc: RestaurantImagesService) {}

  @UseGuards(AuthGuard, RolesGuard, ManagerRestaurantGuard)
  @Roles("admin", "manager")
  @Post()
  @ApiOperation({ summary: "Restoran rasmi qo‘shish" })
  @ApiResponse({ status: 201, type: RestaurantImage })
  create(@Body() dto: CreateRestaurantImageDto) {
    return this.svc.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha restaurant rasmlari" })
  @ApiResponse({ status: 200, type: [RestaurantImage] })
  findAll() {
    return this.svc.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha rasm" })
  @ApiResponse({ status: 200, type: RestaurantImage })
  @ApiResponse({ status: 404, description: "Topilmadi" })
  findOne(@Param("id") id: string) {
    return this.svc.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard, ManagerRestaurantGuard)
  @Roles("admin", "manager")
  @Patch(":id")
  @ApiOperation({ summary: "Rasmni yangilash" })
  @ApiResponse({ status: 200, type: RestaurantImage })
  update(@Param("id") id: string, @Body() dto: UpdateRestaurantImageDto) {
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
