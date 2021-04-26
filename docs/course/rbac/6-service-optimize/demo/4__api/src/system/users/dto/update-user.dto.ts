import { IsEmail, IsPhoneNumber } from 'class-validator';
import { User } from '../user.entity';

export class UpdateUserDto extends User {
  @IsEmail()
  email: string;

  @IsPhoneNumber('CH')
  phone: string;
}
