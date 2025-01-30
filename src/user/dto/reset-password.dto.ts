import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  resetCode: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;
}
