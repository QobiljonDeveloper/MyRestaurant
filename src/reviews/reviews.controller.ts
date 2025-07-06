import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ReviewsService } from "./reviews.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { Review } from "./models/review.model";

@ApiTags("Reviews")
@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi sharh qo‘shish" })
  @ApiResponse({
    status: 201,
    description: "Sharh muvaffaqiyatli qo‘shildi",
    type: Review,
  })
  @ApiResponse({
    status: 400,
    description: "Xato: foydalanuvchi allaqachon sharh qoldirgan",
  })
  @ApiResponse({
    status: 404,
    description: "Foydalanuvchi yoki restoran topilmadi",
  })
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha sharhlarni ko‘rish" })
  @ApiResponse({ status: 200, description: "Barcha sharhlar", type: [Review] })
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Sharhni ID orqali olish" })
  @ApiResponse({ status: 200, description: "Sharh topildi", type: Review })
  @ApiResponse({ status: 404, description: "Sharh topilmadi" })
  findOne(@Param("id") id: string) {
    return this.reviewsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Sharhni yangilash" })
  @ApiResponse({ status: 200, description: "Sharh yangilandi", type: Review })
  @ApiResponse({ status: 404, description: "Sharh topilmadi" })
  update(@Param("id") id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Sharhni o‘chirish" })
  @ApiResponse({ status: 200, description: "Sharh muvaffaqiyatli o‘chirildi" })
  @ApiResponse({ status: 404, description: "Sharh topilmadi" })
  remove(@Param("id") id: string) {
    return this.reviewsService.remove(+id);
  }
}
