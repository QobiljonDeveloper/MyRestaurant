import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { User } from "src/users/models/user.model";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(user: User) {
    const url = `${process.env.api_url}/api/auth/activate/${user.activation_link}`;
    console.log(url);
    await this.mailerService.sendMail({
      to: user.email,
      subject: "Welcome to MyRestaurant App!",
      template: "./confirmation",
      context: {
        name: user.name,
        url,
      },
    });
  }
}
