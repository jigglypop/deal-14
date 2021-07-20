import { IsInt } from 'class-validator';
import BaseRequest from './base.request';

export class ReadChatMessageRequest extends BaseRequest {
  @IsInt()
  chatMessageId!: number;

  constructor(data: ReadChatMessageRequest) {
    super();
    this.chatMessageId = data.chatMessageId;
  }
}