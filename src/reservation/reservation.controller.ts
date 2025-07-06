import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ReservationService } from "./reservation.service";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { UpdateReservationDto } from "./dto/update-reservation.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Reservation } from "./models/reservation.model";

@ApiTags("Reservations")
@Controller("reservation")
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

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

  @Get(":id")
  @ApiOperation({ summary: "Bitta bandlovni ko‘rish" })
  @ApiResponse({
    status: 200,
    description: "Tanlangan bandlov",
    type: Reservation,
  })
  @ApiResponse({ status: 404, description: "Bandlov topilmadi" })
  findOne(@Param("id") id: string) {
    return this.reservationService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Bandlov maʼlumotlarini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Bandlov yangilandi",
    type: Reservation,
  })
  @ApiResponse({ status: 404, description: "Bandlov topilmadi" })
  update(
    @Param("id") id: string,
    @Body() updateReservationDto: UpdateReservationDto
  ) {
    return this.reservationService.update(+id, updateReservationDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Bandlovni o‘chirish" })
  @ApiResponse({
    status: 200,
    description: "Bandlov o‘chirildi",
  })
  @ApiResponse({ status: 404, description: "Bandlov topilmadi" })
  remove(@Param("id") id: string) {
    return this.reservationService.remove(+id);
  }
}
