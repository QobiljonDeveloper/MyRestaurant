import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Restaurant } from "../../restaurants/models/restaurant.model";
import { InjectModel } from "@nestjs/sequelize";
import { Request } from "express";

@Injectable()
export class ManagerRestaurantGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectModel(Restaurant)
    private restaurantModel: typeof Restaurant
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request["user"];

    if (user.role !== "manager") return true;

    const restaurantId =
      request.body?.restaurantId ||
      request.params?.restaurantId ||
      request.params?.id || // Fallback
      null;

    if (!restaurantId) {
      throw new ForbiddenException("Restoran ID topilmadi");
    }

    const restaurant = await this.restaurantModel.findByPk(restaurantId);

    if (!restaurant) {
      throw new ForbiddenException("Restoran mavjud emas");
    }

    if (restaurant.ownerId !== user.id) {
      throw new ForbiddenException("Siz bu restoranga amal bajara olmaysiz");
    }

    return true;
  }
}
