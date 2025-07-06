import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Payment } from "./models/payment.model";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/role.guard";
import { Roles } from "../common/decorators/roles.decorator";

@ApiTags("Payments")
@Controller("payments")
export class PaymentsController {
  constructor(private readonly svc: PaymentsService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin")
  @Post()
  @ApiOperation({ summary: "Yangi to‘lov yaratish" })
  @ApiResponse({ status: 201, type: Payment })
  create(@Body() dto: CreatePaymentDto) {
    return this.svc.create(dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin")
  @Get()
  @ApiOperation({ summary: "Barcha to‘lovlar" })
  @ApiResponse({ status: 200, type: [Payment] })
  findAll() {
    return this.svc.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin")
  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha to‘lov" })
  @ApiResponse({ status: 200, type: Payment })
  @ApiResponse({ status: 404, description: "Topilmadi" })
  findOne(@Param("id") id: string) {
    return this.svc.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin")
  @Patch(":id")
  @ApiOperation({ summary: "To‘lovni yangilash" })
  @ApiResponse({ status: 200, type: Payment })
  update(@Param("id") id: string, @Body() dto: UpdatePaymentDto) {
    return this.svc.update(+id, dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin")
  @Delete(":id")
  @ApiOperation({ summary: "To‘lovni o‘chirish" })
  remove(@Param("id") id: string) {
    return this.svc.remove(+id);
  }
}
