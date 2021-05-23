import { IsEmail, IsPhoneNumber } from 'class-validator';
import { User } from '../user.entity';

export class CreateUserDto extends User {
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string;

  @IsPhoneNumber(null, { message: '电话号码格式不正确' })
  phone: string;
}
