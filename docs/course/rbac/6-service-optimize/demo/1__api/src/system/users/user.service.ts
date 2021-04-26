import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { User } from './user.entity';
import { XGroupItem, XIdType, XQuery, XResultList } from '@ng-nest/api/core';

@Injectable()
export class UserService {
  constructor(
    /**
     * 用户仓储
     */
    @InjectRepository(User)
    public readonly repository: Repository<User>,
  ) {}

  /**
   * 获取用户列表
   * @param query 查询过滤条件
   * @returns
   */
  async getList(query: XQuery): Promise<XResultList<User | XGroupItem>> {
    ...
  }

  /**
   * 获取用户详情
   * @param id 用户id
   * @returns
   */
  async get(id: XIdType): Promise<User> {
    ...
  }

  /**
   * 创建用户
   * @param user
   * @returns
   */
  async post(user: User): Promise<User> {
    ...
  }

  /**
   * 修改用户
   * @param user
   * @returns
   */
  async put(user: User): Promise<User> {
    ...
  }

  /**
   * 删除用户
   * @param id 用户id
   * @returns
   */
  async delete(id: XIdType): Promise<User> {
    ...
  }
}
