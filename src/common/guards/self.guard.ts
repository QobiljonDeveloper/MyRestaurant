import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class SelfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const user = request["user"];

    const targetId = request.params["id"];

    if (!user) {
      throw new ForbiddenException("Foydalanuvchi topilmadi");
    }

    if (user.role === "admin") {
      return true;
    }

    if (Number(user.id) !== Number(targetId)) {
      throw new ForbiddenException("Sizga bu amalga ruxsat yo‘q");
    }

    return true;
  }
}
