import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { XIdType, XQuery } from '@ng-nest/api/core';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(public readonly userService: UserService) {}

  @Get()
  async getList(@Query() query: XQuery) {
    return await this.userService.getList(query);
  }

  @Get(':id')
  async get(@Param('id') id: XIdType): Promise<User> {
    return await this.userService.get(id);
  }

  @Post()
  async post(@Body() user: User): Promise<User> {
    return await this.userService.post(user);
  }

  @Put()
  async put(@Body() user: User): Promise<User> {
    return await this.userService.put(user);
  }

  @Delete(':id')
  async delete(@Param('id') id: XIdType): Promise<User> {
    return await this.userService.delete(id);
  }
}
