import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { FavoritesService } from "./favorites.service";
import { CreateFavoriteDto } from "./dto/create-favorite.dto";
import { UpdateFavoriteDto } from "./dto/update-favorite.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Favorite } from "./models/favorite.model";

@ApiTags("Favorites")
@Controller("favorites")
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @ApiOperation({ summary: "Yangi sevimli restoran qo‘shish" })
  @ApiResponse({
    status: 201,
    description: "Sevimli restoran muvaffaqiyatli qo‘shildi",
    type: Favorite,
  })
  @ApiResponse({
    status: 404,
    description: "Foydalanuvchi yoki restoran topilmadi",
  })
  create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoritesService.create(createFavoriteDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha sevimli restoranlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Sevimli restoranlar ro‘yxati",
    type: [Favorite],
  })
  findAll() {
    return this.favoritesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Bitta sevimlini ID orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Topilgan sevimli restoran",
    type: Favorite,
  })
  @ApiResponse({ status: 404, description: "Sevimli topilmadi" })
  findOne(@Param("id") id: string) {
    return this.favoritesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Sevimlini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Sevimli restoran yangilandi",
    type: Favorite,
  })
  @ApiResponse({ status: 404, description: "Sevimli topilmadi" })
  update(
    @Param("id") id: string,
    @Body() updateFavoriteDto: UpdateFavoriteDto
  ) {
    return this.favoritesService.update(+id, updateFavoriteDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Sevimli restoran yozuvini o‘chirish" })
  @ApiResponse({
    status: 200,
    description: "Sevimli o‘chirildi",
  })
  @ApiResponse({ status: 404, description: "Sevimli topilmadi" })
  remove(@Param("id") id: string) {
    return this.favoritesService.remove(+id);
  }
}
