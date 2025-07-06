import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Restaurant } from "../../restaurants/models/restaurant.model";
import { Review } from "../../reviews/models/review.model";
import { Reservation } from "../../reservation/models/reservation.model";
import { Favorite } from "../../favorites/models/favorite.model";
import { Payment } from "../../payments/models/payment.model";

export enum UserRole {
  ADMIN = "admin",
  MANAGER = "manager",
  CUSTOMER = "customer",
}

interface IUserCreationAttr {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
}

@Table({ tableName: "users", createdAt: true, updatedAt: false })
export class User extends Model<User, IUserCreationAttr> {
  @ApiProperty({ example: 1, description: "Foydalanuvchi ID raqami" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "Ali Valiyev",
    description: "Foydalanuvchining to‘liq ismi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_active: boolean;
  @ApiProperty({
    example: "ali@example.com",
    description: "Foydalanuvchining email manzili",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @ApiProperty({
    example: "P@ssw0rd!",
    description: "Foydalanuvchining paroli (hashlangan bo'lishi kerak)",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Foydalanuvchining telefon raqami",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare phone: string;

  @ApiProperty({
    example: UserRole.CUSTOMER,
    enum: UserRole,
    description: "Foydalanuvchining roli",
  })
  @Column({
    type: DataType.ENUM(...Object.values(UserRole)),
    defaultValue: UserRole.CUSTOMER,
  })
  declare role: UserRole;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare activation_link: string;

  @ApiProperty({
    example: "hashed_refresh_token",
    description: "Foydalanuvchining refresh tokeni (hash holatda)",
    required: false,
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare refresh_token: string | null;

  @ApiProperty({
    example: new Date(),
    description: "Foydalanuvchi yaratilgan vaqti",
  })
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare createdAt: Date;

  @HasMany(() => Restaurant)
  restaurant: Restaurant[];

  @HasMany(() => Review)
  review: Review[];

  @HasMany(() => Reservation)
  reservation: Reservation[];

  @HasMany(() => Favorite)
  favorite: Favorite[];

  @HasMany(() => Payment)
  payment: Payment[];
}
