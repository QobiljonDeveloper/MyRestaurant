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
import { RegionsService } from "./regions.service";
import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Region } from "./models/region.models";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/role.guard";
import { Roles } from "../common/decorators/roles.decorator";

@ApiTags("Regions")
@Controller("regions")
export class RegionsController {
  constructor(private readonly svc: RegionsService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin")
  @Post()
  @ApiOperation({ summary: "Yangi region yaratish" })
  @ApiResponse({ status: 201, type: Region })
  create(@Body() dto: CreateRegionDto) {
    return this.svc.create(dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin")
  @Get()
  @ApiOperation({ summary: "Barcha regionlar" })
  @ApiResponse({ status: 200, type: [Region] })
  findAll() {
    return this.svc.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin")
  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha region" })
  @ApiResponse({ status: 200, type: Region })
  @ApiResponse({ status: 404, description: "Topilmadi" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.svc.findOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin")
  @Patch(":id")
  @ApiOperation({ summary: "Regionni yangilash" })
  @ApiResponse({ status: 200, type: Region })
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateRegionDto) {
    return this.svc.update(id, dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin")
  @Delete(":id")
  @ApiOperation({ summary: "Regionni o‘chirish" })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }
}
