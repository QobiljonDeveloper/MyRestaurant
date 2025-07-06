import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { TablesService } from "./tables.service";
import { CreateTableDto } from "./dto/create-table.dto";
import { UpdateTableDto } from "./dto/update-table.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Tables } from "./models/table.model";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/role.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { ManagerRestaurantGuard } from "../common/guards/managerRestaurant.guard";

@ApiTags("Tables")
@Controller("tables")
export class TablesController {
  constructor(private readonly svc: TablesService) {}

  @UseGuards(AuthGuard, RolesGuard, ManagerRestaurantGuard)
  @Roles("admin", "manager")
  @Post()
  @ApiOperation({ summary: "Yangi stol yaratish" })
  @ApiResponse({ status: 201, type: Tables })
  create(@Body() dto: CreateTableDto) {
    return this.svc.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Stollar ro‘yxati" })
  @ApiResponse({ status: 200, type: [Tables] })
  findAll() {
    return this.svc.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha stol" })
  @ApiResponse({ status: 200, type: Tables })
  @ApiResponse({ status: 404, description: "Topilmadi" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.svc.findOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard, ManagerRestaurantGuard)
  @Roles("admin", "manager")
  @Patch(":id")
  @ApiOperation({ summary: "Stolni yangilash" })
  @ApiResponse({ status: 200, type: Tables })
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateTableDto) {
    return this.svc.update(id, dto);
  }

  @UseGuards(AuthGuard, RolesGuard, ManagerRestaurantGuard)
  @Roles("admin", "manager")
  @Delete(":id")
  @ApiOperation({ summary: "Stolni o‘chirish" })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }
}
