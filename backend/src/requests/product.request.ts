import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import Categories from '../enum/category.enum';
import BaseRequest from './base.request';

export class ReadDetailProductsRequest extends BaseRequest {
  @IsOptional()
  @IsEnum(Categories)
  category?: Categories;

  @IsOptional()
  @IsNumber()
  townId?: number;

  constructor(data: ReadDetailProductsRequest) {
    super();
    this.category = data.category;
    this.townId = data.townId;
  }
}

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
