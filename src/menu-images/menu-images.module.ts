  import { Module } from "@nestjs/common";
  import { MenuImagesService } from "./menu-images.service";
  import { MenuImagesController } from "./menu-images.controller";
  import { SequelizeModule } from "@nestjs/sequelize";
  import { MenuImage } from "./models/menu-image.model";
  import { AuthModule } from "../auth/auth.module";
  import { RestaurantsModule } from "../restaurants/restaurants.module";

  @Module({
    imports: [
      SequelizeModule.forFeature([MenuImage]),
      RestaurantsModule,
      AuthModule,
    ],
    controllers: [MenuImagesController],
    providers: [MenuImagesService],
  })
  export class MenuImagesModule {}
