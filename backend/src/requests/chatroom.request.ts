import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';
import Categories from '../enum/category.enum';
import BaseRequest from './base.request';

export class CreateChatroomRequest extends BaseRequest {

  @IsInt()
  productId: number;

  @IsString()
  userId: string;

  constructor(data: CreateChatroomRequest) {
    super();
    this.productId = data.productId;
    this.userId = data.userId;

  }
}
