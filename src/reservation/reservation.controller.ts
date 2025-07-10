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
import { ReservationService } from "./reservation.service";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { UpdateReservationDto } from "./dto/update-reservation.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Reservation } from "./models/reservation.model";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/role.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { SelfGuard } from "../common/guards/self.guard";

@ApiTags("Reservations")
@Controller("reservation")
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @UseGuards(AuthGuard)
  @Get("today")
  getTodayReservations() {
    return this.reservationService.getTodayReservations();
  }

  @UseGuards(AuthGuard)
  
  @Post()
  @ApiOperation({ summary: "Yangi bandlov yaratish" })
  @ApiResponse({
    status: 201,
    description: "Bandlov muvaffaqiyatli yaratildi",
    type: Reservation,
  })
  @ApiResponse({
    status: 404,
    description: "Foydalanuvchi yoki restoran yoki stol topilmadi",
  })
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.create(createReservationDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin")
  @Get()
  @ApiOperation({ summary: "Barcha bandlovlarni ko‘rish" })
  @ApiResponse({
    status: 200,
    description: "Bandlovlar ro‘yxati",
    type: [Reservation],
  })
  findAll() {
    return this.reservationService.findAll();
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Get(":id")
  @ApiOperation({ summary: "Bitta bandlovni ko‘rish" })
  @ApiResponse({
    status: 200,
    description: "Tanlangan bandlov",
    type: Reservation,
  })
  @ApiResponse({ status: 404, description: "Bandlov topilmadi" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.reservationService.findOne(id);
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Bandlov maʼlumotlarini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Bandlov yangilandi",
    type: Reservation,
  })
  @ApiResponse({ status: 404, description: "Bandlov topilmadi" })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateReservationDto: UpdateReservationDto
  ) {
    return this.reservationService.update(id, updateReservationDto);
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Bandlovni o‘chirish" })
  @ApiResponse({
    status: 200,
    description: "Bandlov o‘chirildi",
  })
  @ApiResponse({ status: 404, description: "Bandlov topilmadi" })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.reservationService.remove(id);
  }
}
