import { Repository, getManager } from 'typeorm';
import { XQuery, XId, XResultList, XIdType } from '../interfaces';

export abstract class XRepositoryService<
  Entity extends XId,
  Query extends XQuery
> {
  constructor(private repository: Repository<Entity>) {}

  async getList(query: Query): Promise<XResultList<Entity>> {
    return new Promise<XResultList<Entity>>(async x => {
      let qb = this.repository.createQueryBuilder('entity');
      query.size = Number(query.size) || 10;
      query.index = Number(query.index) || 1;

      let result: XResultList<Entity> = {
        list: await qb
          .skip(query.size * (query.index - 1))
          .take(query.size)
          .getMany(),
        total: await qb.getCount(),
        query: query,
      };
      x(result);
    });
  }

  async get(id: XIdType): Promise<Entity> {
    return await this.repository.findOne(id);
  }

  async post(entity: any): Promise<Entity> {
    return await this.repository.save(entity);
  }

  async put(entity: Entity): Promise<Entity> {
    let index = await this.repository.findOne(entity.id);
    if (index) {
      Object.assign(index, entity);
      await getManager().transaction(async transactionalEntityManager => {
        await transactionalEntityManager.save(index);
      });

      return index;
    }
  }

  async delete(id: XIdType): Promise<Entity> {
    let entity = await this.repository.findOne(id);
    return await this.repository.remove(entity);
  }
}
