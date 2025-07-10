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
  Query,
  BadRequestException,
} from "@nestjs/common";
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
  ApiQuery,
} from "@nestjs/swagger";
import { ReviewsService } from "./reviews.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { Review } from "./models/review.model";
import { AuthGuard } from "../common/guards/auth.guard";
import { SelfGuard } from "../common/guards/self.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesGuard } from "../common/guards/role.guard";

@ApiTags("Reviews")
@ApiBearerAuth()
@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: "Yangi sharh qo‘shish" })
  @ApiResponse({ status: 201, type: Review })
  create(@Request() req, @Body() dto: CreateReviewDto) {
    return this.reviewsService.create({
      ...dto,
    });
  }

  @ApiQuery({ name: "limit", required: false })
  @Get("top-reviewed")
  @ApiOperation({ summary: "Eng ko‘p sharh olingan restoranlar" })
  getTopReviewed(@Query("limit") limit?: string) {
    const lim = limit ? parseInt(limit, 10) : 10;
    return this.reviewsService.getTopReviewedRestaurants(lim);
  }

  @ApiQuery({ name: "limit", required: false })
  @Get("top-rated")
  @ApiOperation({ summary: "Eng yaxshi reytingga ega restoranlar" })
  getTopRated(@Query("limit") limit?: string) {
    const lim = limit ? parseInt(limit, 10) : 10;
    return this.reviewsService.getTopRatedRestaurants(lim);
  }

  @Get()
  @ApiOperation({ summary: "Barcha sharhlar (admin)" })
  @ApiResponse({ status: 200, type: [Review] })
  findAll() {
    return this.reviewsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get("mine")
  @ApiOperation({ summary: "Foydalanuvchining o‘ziga tegishli sharhlar" })
  @ApiResponse({ status: 200, type: [Review] })
  findMine(@Request() req) {
    return this.reviewsService.findMine(req.user.id);
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Get(":id")
  @ApiOperation({ summary: "Sharhni ID orqali olish" })
  @ApiResponse({ status: 200, type: Review })
  findOne(@Param("id") id: string) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      throw new BadRequestException("ID noto‘g‘ri formatda");
    }
    return this.reviewsService.findOne(parsedId);
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Sharhni yangilash (egasi)" })
  update(@Param("id") id: string, @Body() dto: UpdateReviewDto) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      throw new BadRequestException("ID noto‘g‘ri formatda");
    }
    return this.reviewsService.update(parsedId, dto);
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Sharhni o‘chirish (egasi)" })
  remove(@Param("id") id: string) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      throw new BadRequestException("ID noto‘g‘ri formatda");
    }
    return this.reviewsService.remove(parsedId);
  }
}
