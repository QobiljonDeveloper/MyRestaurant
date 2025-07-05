import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { MenuService } from "./menu.service";
import { CreateMenuDto } from "./dto/create-menu.dto";
import { UpdateMenuDto } from "./dto/update-menu.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";

@ApiTags("Menu")
@Controller("menu")
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @ApiOperation({ summary: "Yangi taom yaratish" })
  @ApiResponse({
    status: 201,
    description: "Yangi taom muvaffaqiyatli yaratildi",
  })
  @ApiResponse({ status: 400, description: "Notog‘ri maʼlumotlar" })
  @ApiResponse({
    status: 404,
    description: "Restaurant yoki kategoriya topilmadi",
  })
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha taomlarni olish" })
  @ApiResponse({ status: 200, description: "Taomlar ro‘yxati" })
  findAll() {
    return this.menuService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Bitta taomni ID orqali olish" })
  @ApiParam({ name: "id", type: Number, description: "Taom ID raqami" })
  @ApiResponse({ status: 200, description: "Topilgan taom" })
  @ApiResponse({ status: 404, description: "Taom topilmadi" })
  findOne(@Param("id") id: string) {
    return this.menuService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Taom maʼlumotlarini yangilash" })
  @ApiParam({ name: "id", type: Number, description: "Taom ID raqami" })
  @ApiResponse({ status: 200, description: "Yangilangan taom" })
  @ApiResponse({ status: 404, description: "Taom topilmadi" })
  update(@Param("id") id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(+id, updateMenuDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Taomni o‘chirish" })
  @ApiParam({ name: "id", type: Number, description: "Taom ID raqami" })
  @ApiResponse({ status: 200, description: "Taom o‘chirildi" })
  @ApiResponse({ status: 404, description: "Taom topilmadi" })
  remove(@Param("id") id: string) {
    return this.menuService.remove(+id);
  }
}
