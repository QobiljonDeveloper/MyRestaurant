import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { TelegrafModule } from "nestjs-telegraf";
import { BOT_NAME } from "./app.constants";
import { User } from "./users/models/user.model";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { RestaurantsModule } from "./restaurants/restaurants.module";
import { Restaurant } from "./restaurants/models/restaurant.model";
import { RegionsModule } from "./regions/regions.module";
import { Region } from "./regions/models/region.models";
import { DistrictModule } from "./district/district.module";
import { District } from "./district/models/district.model";
import { TablesModule } from "./tables/tables.module";
import { Tables } from "./tables/models/table.model";
import { MenuImagesModule } from "./menu-images/menu-images.module";
import { MenuImage } from "./menu-images/models/menu-image.model";
import { MenuModule } from "./menu/menu.module";
import { Menu } from "./menu/models/menu.model";
import { MenuCategoriesModule } from "./menu-categories/menu-categories.module";
import { MenuCategory } from "./menu-categories/models/menu-category.model";
import { RestaurantImagesModule } from "./restaurant-images/restaurant-images.module";
import { RestaurantImage } from "./restaurant-images/models/restaurant-image.model";
import { ReviewsModule } from "./reviews/reviews.module";
import { Review } from "./reviews/models/review.model";

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN!,
        middlewares: [],
        include: [],
      }),
    }),
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [
        User,
        Restaurant,
        Region,
        District,
        Tables,
        MenuImage,
        Menu,
        MenuCategory,
        RestaurantImage,
        Review,
      ],
      autoLoadModels: true,
      logging: false,
      sync: { alter: true },
    }),
    UsersModule,
    AuthModule,
    RestaurantsModule,
    RegionsModule,
    DistrictModule,
    TablesModule,
    MenuImagesModule,
    MenuModule,
    MenuCategoriesModule,
    RestaurantImagesModule,
    ReviewsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
