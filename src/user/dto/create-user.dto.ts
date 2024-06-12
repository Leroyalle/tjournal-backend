import { IsEmail, Length, max, min } from 'class-validator';

export class CreateUserDto {
  @Length(3)
  fullName: string;

  @IsEmail(undefined, { message: 'Неверная почта' })
  email: string;

  @Length(6, 12, { message: 'Пароль должен быть минимум 6 символов' })
  password?: string;
}
