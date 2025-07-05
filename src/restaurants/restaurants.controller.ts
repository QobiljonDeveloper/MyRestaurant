import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { RestaurantsService } from "./restaurants.service";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Restaurants")
@Controller("restaurants")
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi restoran yaratish" })
  @ApiResponse({
    status: 201,
    description: "Restoran muvaffaqiyatli yaratildi",
  })
  @ApiResponse({ status: 400, description: "Xatolik yuz berdi" })
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha restoranlarni olish" })
  @ApiResponse({ status: 200, description: "Restoranlar ro‘yxati" })
  findAll() {
    return this.restaurantsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID orqali restoran olish" })
  @ApiResponse({ status: 200, description: "Restoran topildi" })
  @ApiResponse({ status: 404, description: "Restoran topilmadi" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.restaurantsService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Restoran ma’lumotlarini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Restoran muvaffaqiyatli yangilandi",
  })
  @ApiResponse({ status: 404, description: "Restoran topilmadi" })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRestaurantDto: UpdateRestaurantDto
  ) {
    return this.restaurantsService.update(id, updateRestaurantDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Restoranni o‘chirish" })
  @ApiResponse({
    status: 200,
    description: "Restoran muvaffaqiyatli o‘chirildi",
  })
  @ApiResponse({ status: 404, description: "Restoran topilmadi" })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.restaurantsService.remove(id);
  }
}
