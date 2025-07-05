import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { MenuCategoriesService } from "./menu-categories.service";
import { CreateMenuCategoryDto } from "./dto/create-menu-category.dto";
import { UpdateMenuCategoryDto } from "./dto/update-menu-category.dto";
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from "@nestjs/swagger";
import { MenuCategory } from "./models/menu-category.model";

@ApiTags("Menu Categories")
@Controller("menu-categories")
export class MenuCategoriesController {
  constructor(private readonly menuCategoriesService: MenuCategoriesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new Menu Category" })
  @ApiResponse({
    status: 201,
    description: "Menu category successfully created",
    type: MenuCategory,
  })
  @ApiResponse({ status: 400, description: "Invalid input or duplicate name" })
  @ApiResponse({ status: 404, description: "Restaurant not found" })
  create(@Body() createMenuCategoryDto: CreateMenuCategoryDto) {
    return this.menuCategoriesService.create(createMenuCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all Menu Categories" })
  @ApiResponse({
    status: 200,
    description: "List of all menu categories",
    type: [MenuCategory],
  })
  findAll() {
    return this.menuCategoriesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Menu Category by ID" })
  @ApiParam({ name: "id", type: Number, description: "Menu category ID" })
  @ApiResponse({
    status: 200,
    description: "Menu category found",
    type: MenuCategory,
  })
  @ApiResponse({ status: 404, description: "Menu category not found" })
  findOne(@Param("id") id: string) {
    return this.menuCategoriesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update Menu Category by ID" })
  @ApiParam({ name: "id", type: Number, description: "Menu category ID" })
  @ApiResponse({
    status: 200,
    description: "Menu category updated",
    type: MenuCategory,
  })
  @ApiResponse({ status: 404, description: "Menu category not found" })
  update(
    @Param("id") id: string,
    @Body() updateMenuCategoryDto: UpdateMenuCategoryDto
  ) {
    return this.menuCategoriesService.update(+id, updateMenuCategoryDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete Menu Category by ID" })
  @ApiParam({ name: "id", type: Number, description: "Menu category ID" })
  @ApiResponse({ status: 200, description: "Menu category deleted" })
  @ApiResponse({ status: 404, description: "Menu category not found" })
  remove(@Param("id") id: string) {
    return this.menuCategoriesService.remove(+id);
  }
}
