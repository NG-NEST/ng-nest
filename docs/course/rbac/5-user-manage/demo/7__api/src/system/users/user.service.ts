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
   * @param index 页码
   * @param size 每页条数
   * @param query 查询过滤条件
   * @returns
   */
  async getList(query: XQuery): Promise<XResultList<User | XGroupItem>> {
    query.index = typeof query.index === 'undefined' ? 1 : Number(query.index);
    query.size = typeof query.size === 'undefined' ? 10 : Number(query.size);
    let cqb = this.repository.createQueryBuilder('entity');
    return {
      list: await cqb.skip(query.size * (query.index - 1)).getMany(),
      total: await cqb.getCount(),
    };
  }

  /**
   * 获取用户详情
   * @param id 用户id
   * @returns
   */
  async get(id: XIdType): Promise<User> {
    return await this.repository.findOne(id);
  }

  /**
   * 创建用户
   * @param user
   * @returns
   */
  async post(user: User): Promise<User> {
    return await this.repository.save(user);
  }

  /**
   * 修改用户
   * @param user
   * @returns
   */
  async put(user: User): Promise<User> {
    let index = await this.repository.findOne(user.id);
    if (index) {
      Object.assign(index, user);
      await getManager().transaction(async transactionalEntityManager => {
        await transactionalEntityManager.save(index);
      });

      return index;
    }
  }

  /**
   * 删除用户
   * @param id 用户id
   * @returns
   */
  async delete(id: XIdType): Promise<User> {
    let entity = await this.repository.findOne(id);
    return await this.repository.remove(entity);
  }
}
