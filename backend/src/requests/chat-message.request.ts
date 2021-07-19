import { IsNotEmpty } from 'class-validator';
import BaseRequest from './base.request';

export class SendChatMessageRequest extends BaseRequest {

  @IsNotEmpty()
  content: string;

  constructor(data: SendChatMessageRequest) {
    super();
    this.content = data.content
  }
}