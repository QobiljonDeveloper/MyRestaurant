import { PartialType } from '@nestjs/swagger';
import { CreateRestaurantImageDto } from './create-restaurant-image.dto';

export class UpdateRestaurantImageDto extends PartialType(CreateRestaurantImageDto) {}
