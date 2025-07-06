import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";

@Injectable()
export class IsCreatorGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log("User object in IsCreatorGuard:", user);

    if (!user || user.is_creator !== true) {
      throw new ForbiddenException(
        "Faqat isCreator user admin yaratishi mumkin"
      );
    }

    return true;
  }
}
