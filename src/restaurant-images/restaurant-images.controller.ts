import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { RestaurantImagesService } from "./restaurant-images.service";
import { CreateRestaurantImageDto } from "./dto/create-restaurant-image.dto";
import { UpdateRestaurantImageDto } from "./dto/update-restaurant-image.dto";
import { RestaurantImage } from "./models/restaurant-image.model";

@ApiTags("Restaurant Images")
@Controller("restaurant-images")
export class RestaurantImagesController {
  constructor(
    private readonly restaurantImagesService: RestaurantImagesService
  ) {}

  @Post()
  @ApiOperation({ summary: "Restoran uchun yangi rasm qo‘shish" })
  @ApiResponse({
    status: 201,
    description: "Rasm muvaffaqiyatli qo‘shildi",
    type: RestaurantImage,
  })
  @ApiResponse({ status: 404, description: "Restaurant topilmadi" })
  @ApiResponse({ status: 400, description: "Rasm allaqachon mavjud" })
  create(@Body() createRestaurantImageDto: CreateRestaurantImageDto) {
    return this.restaurantImagesService.create(createRestaurantImageDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha restoran rasmlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Rasmlar ro‘yxati",
    type: [RestaurantImage],
  })
  findAll() {
    return this.restaurantImagesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID orqali restoran rasmni olish" })
  @ApiResponse({
    status: 200,
    description: "Rasm topildi",
    type: RestaurantImage,
  })
  @ApiResponse({ status: 404, description: "Rasm topilmadi" })
  findOne(@Param("id") id: string) {
    return this.restaurantImagesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Restoran rasmni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Rasm yangilandi",
    type: RestaurantImage,
  })
  @ApiResponse({ status: 404, description: "Rasm yoki restoran topilmadi" })
  update(
    @Param("id") id: string,
    @Body() updateRestaurantImageDto: UpdateRestaurantImageDto
  ) {
    return this.restaurantImagesService.update(+id, updateRestaurantImageDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Restoran rasmni o‘chirish" })
  @ApiResponse({ status: 200, description: "Rasm o‘chirildi" })
  @ApiResponse({ status: 404, description: "Rasm topilmadi" })
  remove(@Param("id") id: string) {
    return this.restaurantImagesService.remove(+id);
  }
}
