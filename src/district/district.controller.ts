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
import { DistrictService } from "./district.service";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { District } from "./models/district.model";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/role.guard";
import { Roles } from "../common/decorators/roles.decorator";

@ApiTags("Districts")
@Controller("district")
export class DistrictController {
  constructor(private readonly svc: DistrictService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin")
  @Post()
  @ApiOperation({ summary: "Yangi tuman yaratish" })
  @ApiResponse({ status: 201, type: District })
  create(@Body() dto: CreateDistrictDto) {
    return this.svc.create(dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin")
  @Get()
  @ApiOperation({ summary: "Barcha tumanlarni olish" })
  @ApiResponse({ status: 200, type: [District] })
  findAll() {
    return this.svc.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin")
  @Get(":id")
  @ApiOperation({ summary: "ID orqali tumanni olish" })
  @ApiResponse({ status: 200, type: District })
  @ApiResponse({ status: 404, description: "Topilmadi" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.svc.findOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin")
  @Patch(":id")
  @ApiOperation({ summary: "Tumanni yangilash" })
  @ApiResponse({ status: 200, type: District })
  @ApiResponse({ status: 404, description: "Topilmadi" })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateDistrictDto
  ) {
    return this.svc.update(id, dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin")
  @Delete(":id")
  @ApiOperation({ summary: "Tumanni o‘chirish" })
  @ApiResponse({ status: 200, description: "O‘chirildi" })
  @ApiResponse({ status: 404, description: "Topilmadi" })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }
}
