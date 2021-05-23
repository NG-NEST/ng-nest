import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {
  /**
   * 编码
   */
  @ApiProperty({ description: '编码' })
  id: string;
  /**
   * 名称
   */
  @ApiProperty({ description: '名称' })
  name: string;

  /**
   * 账号
   */
  @ApiProperty({ description: '账号' })
  account: string;

  /**
   * 邮箱
   */
  @ApiProperty({ description: '邮箱' })
  @IsEmail()
  email: string;

  /**
   * 手机号
   */
  @ApiProperty({ description: '手机号' })
  @IsPhoneNumber()
  phone: string;
}
