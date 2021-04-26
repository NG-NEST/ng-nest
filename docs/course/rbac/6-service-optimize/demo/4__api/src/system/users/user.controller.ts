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
import { ApiParam } from '@nestjs/swagger';
import { XIdType, XQuery } from '@ng-nest/api/core';
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUserDto } from './dto/list-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(public readonly userService: UserService) {}

  @Get()
  @ApiParam({ name: 'index', type: Number, example: 1 })
  @ApiParam({ name: 'size', type: Number, example: 10 })
  async getList(@Query() query: XQuery) {
    let result = await this.userService.getList(query);
    return {
      ...result,
      ...{ list: plainToClass(ListUserDto, result.list) },
    };
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  async get(@Param('id') id: XIdType): Promise<User> {
    return await this.userService.get(id);
  }

  @Post()
  async post(@Body() user: CreateUserDto): Promise<boolean> {
    return await this.userService.post(plainToClass(User, user));
  }

  @Put()
  async put(@Body() user: UpdateUserDto): Promise<User> {
    return await this.userService.put(plainToClass(User, user));
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  async delete(@Param('id') id: XIdType): Promise<User> {
    return await this.userService.delete(id);
  }
}
