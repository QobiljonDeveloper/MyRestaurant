import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ReviewsService } from "./reviews.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { Review } from "./models/review.model";
import { AuthGuard } from "../common/guards/auth.guard";
import { SelfGuard } from "../common/guards/self.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesGuard } from "../common/guards/role.guard";

@ApiTags("Reviews")
@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: "Yangi sharh qo‘shish (faqat login bo‘lgan user)" })
  @ApiResponse({
    status: 201,
    description: "Sharh muvaffaqiyatli qo‘shildi",
    type: Review,
  })
  create(@Request() req, @Body() dto: CreateReviewDto) {
    return this.reviewsService.create({
      ...dto,
      userId: req.user.id,
    });
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin")
  @Get()
  @ApiOperation({ summary: "Barcha sharhlarni ko‘rish (admin only)" })
  @ApiResponse({ status: 200, type: [Review] })
  findAll() {
    return this.reviewsService.findAll();
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Get(":id")
  @ApiOperation({ summary: "Sharhni ID orqali olish (faqat egasi yoki admin)" })
  @ApiResponse({ status: 200, type: Review })
  findOne(@Param("id") id: string) {
    return this.reviewsService.findOne(+id);
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Sharhni yangilash (faqat egasi)" })
  @ApiResponse({ status: 200, type: Review })
  update(@Param("id") id: string, @Body() dto: UpdateReviewDto) {
    return this.reviewsService.update(+id, dto);
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Sharhni o‘chirish (faqat egasi)" })
  @ApiResponse({ status: 200, description: "O‘chirildi" })
  remove(@Param("id") id: string) {
    return this.reviewsService.remove(+id);
  }
}
