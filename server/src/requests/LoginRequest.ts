import { IsString } from 'class-validator';

export class LoginRequest {
  @IsString()
  public email!: string;

  @IsString()
  public password!: string;
}
