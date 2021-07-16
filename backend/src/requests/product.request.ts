import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';
import Categories from '../enum/category.enum';
import BaseRequest from './base.request';

export class ReadDetailProductsRequest extends BaseRequest {
  @IsOptional()
  @Min(0)
  @Max(11)
  @IsInt()
  category?: Categories;

  @IsOptional()
  @IsInt()
  townId?: number;

  constructor(data: ReadDetailProductsRequest) {
    super();
    this.category = data.category && Number(data.category);
    this.townId = data.townId && Number(data.townId);
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

  @IsInt()
  category: Categories;

  @IsInt()
  townId: number;

  @IsString({ each: true })
  images: string[];

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
