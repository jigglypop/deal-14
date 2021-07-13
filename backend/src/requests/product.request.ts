import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import Categories from '../enum/category.enum';
import BaseRequest from './base.request';

export class WriteProductRequest extends BaseRequest {
  @IsNotEmpty()
  title!: string;

  @IsInt()
  @IsOptional()
  price: number | null;

  @IsNotEmpty()
  content!: string;

  @IsEnum(Categories)
  category: Categories;

  @IsInt()
  townId: number;

  @IsString({ each: true })
  images: string;

  constructor(data: WriteProductRequest) {
    super();
    this.title = data.title;
    this.price = data.price ?? null;
    this.content = data.content;
    this.category = data.category;
    this.townId = data.townId;
    this.images = data.images;
  }
}
