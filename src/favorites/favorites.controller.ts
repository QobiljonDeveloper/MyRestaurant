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
import { FavoritesService } from "./favorites.service";
import { CreateFavoriteDto } from "./dto/create-favorite.dto";
import { UpdateFavoriteDto } from "./dto/update-favorite.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Favorite } from "./models/favorite.model";
import { AuthGuard } from "../common/guards/auth.guard";
import { SelfGuard } from "../common/guards/self.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesGuard } from "../common/guards/role.guard";

@ApiTags("Favorites")
@Controller("favorites")
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: "Yangi sevimli restoran qo‘shish" })
  @ApiResponse({ status: 201, type: Favorite })
  create(@Request() req, @Body() dto: CreateFavoriteDto) {
    return this.favoritesService.create({
      ...dto,
      userId: req.user.id, // foydalanuvchining ID sini avtomatik olish
    });
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin")
  @Get()
  @ApiOperation({ summary: "Admin uchun barcha sevimlilar" })
  @ApiResponse({ status: 200, type: [Favorite] })
  findAll() {
    return this.favoritesService.findAll();
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Get(":id")
  @ApiOperation({ summary: "Sevimlini ID orqali olish (faqat egasi)" })
  @ApiResponse({ status: 200, type: Favorite })
  findOne(@Param("id") id: string) {
    return this.favoritesService.findOne(+id);
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Sevimlini yangilash (faqat egasi)" })
  @ApiResponse({ status: 200, type: Favorite })
  update(@Param("id") id: string, @Body() dto: UpdateFavoriteDto) {
    return this.favoritesService.update(+id, dto);
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Sevimlini o‘chirish (faqat egasi)" })
  @ApiResponse({ status: 200, description: "O‘chirildi" })
  remove(@Param("id") id: string) {
    return this.favoritesService.remove(+id);
  }
}
