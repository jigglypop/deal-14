import { IsNotEmpty } from 'class-validator';
import BaseRequest from './base.request';

export class TownRequest extends BaseRequest {
  @IsNotEmpty()
  townName!: string;

  constructor(data: TownRequest) {
    super();
    this.townName = data.townName;
  }
}
