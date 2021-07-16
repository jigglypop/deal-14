import { IsInt, IsString } from 'class-validator';
import BaseRequest from './base.request';

export class CreateChatmessageRequest {

  @IsInt()
  chatroomId: number;

  @IsString()
  userId: string;

  @IsString()
  content: string;

  constructor(data: CreateChatmessageRequest) {
    this.chatroomId = data.chatroomId;
    this.userId = data.userId;
    this.content = data.content
  }
}
