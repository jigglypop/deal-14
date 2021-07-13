import { IsNotEmpty } from 'class-validator';
import BaseRequest from './base.request';

export class WriteProductRequest extends BaseRequest {
  @IsNotEmpty()
  title!: string;
  content!: string;

  price: string;

  constructor(data: WriteProductRequest) {
    super();
    this.title = data.title;
    this.price = data.price
    this.content = data.content;
  }
}


export class ReadProductRequest {
  
  @IsNotEmpty()
  productId!: string;

  constructor(data: ReadProductRequest) {
    this.productId = data.productId;
  }
}