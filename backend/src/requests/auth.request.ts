import { IsNotEmpty } from 'class-validator';
import BaseRequest from './base.request';

export class LoginRequest extends BaseRequest {
  @IsNotEmpty()
  id!: string;

  constructor(data: LoginRequest) {
    super();
    this.id = data.id;
  }
}
