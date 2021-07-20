import { IsNotEmpty, Length, Matches } from 'class-validator';
import BaseRequest from './base.request';

export class LoginRequest extends BaseRequest {
  @IsNotEmpty()
  id!: string;

  constructor(data: LoginRequest) {
    super();
    this.id = data.id;
  }
}


export class RegisterRequest extends BaseRequest {
  @IsNotEmpty()
  @Matches(/^[0-9a-zA-Z]{1,20}$/)
  id!: string;

  @IsNotEmpty()
  profileImage!: string;


  @IsNotEmpty()
  @Length(1, 25)
  town!: string;

  constructor(data: RegisterRequest) {
    super();
    this.id = data.id;
    this.town = data.town;
    this.profileImage = data.profileImage;
  }
}