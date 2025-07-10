import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from "@nestjs/common";
import { RestaurantsService } from "./restaurants.service";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Restaurant } from "./models/restaurant.model";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/role.guard";
import { Roles } from "../common/decorators/roles.decorator";

@ApiTags("Restaurants")
@Controller("restaurants")
export class RestaurantsController {
  constructor(private readonly svc: RestaurantsService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin")
  @Post()
  @ApiOperation({ summary: "Yangi restoran yaratish" })
  @ApiResponse({ status: 201, type: Restaurant })
  create(@Body() dto: CreateRestaurantDto) {
    return this.svc.create(dto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: "Barcha restoranlar" })
  @ApiResponse({ status: 200, type: [Restaurant] })
  findAll() {
    return this.svc.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha restoran" })
  @ApiResponse({ status: 200, type: Restaurant })
  @ApiResponse({ status: 404, description: "Topilmadi" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.svc.findOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin")
  @Patch(":id")
  @ApiOperation({ summary: "Restoranni yangilash" })
  @ApiResponse({ status: 200, type: Restaurant })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateRestaurantDto
  ) {
    return this.svc.update(id, dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin")
  @Delete(":id")
  @ApiOperation({ summary: "Restoranni o‘chirish" })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }
}
