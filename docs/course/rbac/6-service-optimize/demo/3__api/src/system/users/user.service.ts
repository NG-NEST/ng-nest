import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { XQuery, XRepositoryService } from '@ng-nest/api/core';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService extends XRepositoryService<User, XQuery> {
  constructor(
    @InjectRepository(User)
    public readonly usersRepository: Repository<User>
  ) {
    super(usersRepository);
  }
}
