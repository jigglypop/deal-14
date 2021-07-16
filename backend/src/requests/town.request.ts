import { IsNotEmpty } from 'class-validator';
import BaseRequest from './base.request';

export class CreateUserTownRequest extends BaseRequest {
  @IsNotEmpty()
  townName!: string;

  constructor(data: CreateUserTownRequest) {
    super();
    this.townName = data.townName;
  }
}
