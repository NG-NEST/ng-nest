import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('system_user')
export class User {
  @ApiProperty({ description: '编码' })
  @PrimaryColumn('uuid', { length: 36, comment: '编码' })
  id: string;

  @ApiProperty({ description: '名称' })
  @Column({ length: 36, comment: '名称' })
  name: string;

  @ApiProperty({ description: '账号' })
  @Column()
  account: string;

  @ApiProperty({ description: '邮箱' })
  @Column()
  email: string;

  @ApiProperty({ description: '手机号' })
  @Column()
  phone: string;
}
