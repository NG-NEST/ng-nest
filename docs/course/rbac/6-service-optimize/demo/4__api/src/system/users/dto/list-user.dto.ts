import { Exclude } from 'class-transformer';
import { User } from '../user.entity';

export class ListUserDto extends User {
  @Exclude()
  account: string;
}
