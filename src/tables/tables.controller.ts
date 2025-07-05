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
import { TablesService } from "./tables.service";
import { CreateTableDto } from "./dto/create-table.dto";
import { UpdateTableDto } from "./dto/update-table.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Tables } from "./models/table.model";

@ApiTags("Tables")
@Controller("tables")
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @ApiOperation({ summary: "Yangi stol yaratish" })
  @ApiResponse({
    status: 201,
    description: "Stol muvaffaqiyatli yaratildi",
    type: Tables,
  })
  @ApiResponse({ status: 404, description: "Restoran topilmadi" })
  @ApiResponse({
    status: 409,
    description: "Bu raqamli stol allaqachon mavjud",
  })
  @Post()
  create(@Body() createTableDto: CreateTableDto) {
    return this.tablesService.create(createTableDto);
  }

  @ApiOperation({ summary: "Barcha stollar ro‘yxatini olish" })
  @ApiResponse({
    status: 200,
    description: "Stollar ro‘yxati qaytarildi",
    type: [Tables],
  })
  @Get()
  findAll() {
    return this.tablesService.findAll();
  }

  @ApiOperation({ summary: "Stolni ID orqali olish" })
  @ApiResponse({ status: 200, description: "Stol topildi", type: Tables })
  @ApiResponse({ status: 404, description: "Stol topilmadi" })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.tablesService.findOne(id);
  }

  @ApiOperation({ summary: "Stol maʼlumotlarini yangilash" })
  @ApiResponse({ status: 200, description: "Stol yangilandi", type: Tables })
  @ApiResponse({ status: 404, description: "Stol topilmadi" })
  @ApiResponse({
    status: 409,
    description: "Bu raqamli stol allaqachon mavjud",
  })
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateTableDto: UpdateTableDto
  ) {
    return this.tablesService.update(id, updateTableDto);
  }

  @ApiOperation({ summary: "Stolni o‘chirish" })
  @ApiResponse({ status: 200, description: "Stol o‘chirildi" })
  @ApiResponse({ status: 404, description: "Stol topilmadi" })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.tablesService.remove(id);
  }
}
