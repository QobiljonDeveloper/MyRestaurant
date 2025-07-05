import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { MenuImagesService } from "./menu-images.service";
import { CreateMenuImageDto } from "./dto/create-menu-image.dto";
import { UpdateMenuImageDto } from "./dto/update-menu-image.dto";
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from "@nestjs/swagger";
import { MenuImage } from "./models/menu-image.model";

@ApiTags("Menu Images")
@Controller("menu-images")
export class MenuImagesController {
  constructor(private readonly menuImagesService: MenuImagesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new Menu Image" })
  @ApiResponse({
    status: 201,
    description: "Menu image successfully created",
    type: MenuImage,
  })
  @ApiResponse({ status: 400, description: "Validation or input error" })
  create(@Body() createMenuImageDto: CreateMenuImageDto) {
    return this.menuImagesService.create(createMenuImageDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all Menu Images" })
  @ApiResponse({
    status: 200,
    description: "List of all menu images",
    type: [MenuImage],
  })
  findAll() {
    return this.menuImagesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Menu Image by ID" })
  @ApiParam({ name: "id", type: Number, description: "ID of the menu image" })
  @ApiResponse({
    status: 200,
    description: "Menu image found",
    type: MenuImage,
  })
  @ApiResponse({ status: 404, description: "Menu image not found" })
  findOne(@Param("id") id: string) {
    return this.menuImagesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update Menu Image by ID" })
  @ApiParam({ name: "id", type: Number, description: "ID of the menu image" })
  @ApiResponse({
    status: 200,
    description: "Menu image successfully updated",
    type: MenuImage,
  })
  @ApiResponse({ status: 404, description: "Menu image not found" })
  update(
    @Param("id") id: string,
    @Body() updateMenuImageDto: UpdateMenuImageDto
  ) {
    return this.menuImagesService.update(+id, updateMenuImageDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete Menu Image by ID" })
  @ApiParam({ name: "id", type: Number, description: "ID of the menu image" })
  @ApiResponse({ status: 200, description: "Menu image successfully deleted" })
  @ApiResponse({ status: 404, description: "Menu image not found" })
  remove(@Param("id") id: string) {
    return this.menuImagesService.remove(+id);
  }
}
