import { Injectable } from '@angular/core';
import { XRepositoryAbstract, XQuery, XResultList, XGroupItem, XFilter, XChunk, XGroupBy, XSort, XId, XOrderBy } from '@ng-nest/ui/core';
import { Observable } from 'rxjs';

@Injectable()
export class CheckboxService extends XRepositoryAbstract {
  organizations = ['制造中心', '研发中心', '财务中心', '营销中心', '行政中心'];
  positions = ['技术员', '销售', '经理', '总监', '生产员'];
  users: User[] = Array.from({ length: 123456 }).map((_x, i) => {
    i++;
    return {
      id: i,
      name: '姓名' + i,
      position: this.positions[Math.floor(Math.random() * 10 + 1) % 5],
      email: '邮箱' + i,
      phone: '手机' + i,
      disabled: Math.floor(Math.random() * 10 + 1) % 5 === 0,
      organization: this.organizations[Math.floor(Math.random() * 10 + 1) % 5]
    };
  });

  getList(index: number, size: number, query?: XQuery): Observable<XResultList<User | XGroupItem>> {
    return new Observable((x) => {
      let data: User[] | XGroupItem[] = [];
      data = this.setFilter(this.users, query?.filter as XFilter[]);
      if (query?.group) {
        data = this.setGroup(data, query.group);
      }
      if (query?.sort) {
        data = this.setSort(data, query.sort);
      }
      let chunks = XChunk(data, size);
      if ((index as number) <= chunks.length) {
        x.next({ total: data.length, list: chunks[index - 1] });
      } else {
        x.next({ total: data.length, list: [] });
      }
      x.complete();
    });
  }
  get(_id: number | string): Observable<User> {
    return new Observable();
  }
  post(_entity: User): Observable<User> {
    return new Observable();
  }
  put(_entity: User): Observable<User> {
    return new Observable();
  }
  delete(_id: number | string): Observable<boolean> {
    return new Observable();
  }

  private setFilter(data: User[], filters: XFilter[]): User[] {
    let result = data;
    if (filters && filters.length > 0) {
      filters.forEach((x) => {
        result = result.filter((y) => y[x.field!].indexOf(x.value) >= 0);
      });
    }
    return result;
  }

  private setGroup(data: User[], group: string): XGroupItem[] {
    return XGroupBy(data, group).map((value, key) => {
      let groupItem: XGroupItem = { id: key, count: value.length };
      groupItem[group] = key;
      return groupItem;
    });
  }

  private setSort(data: User[] | XGroupItem[], sort: XSort[]): User[] | XGroupItem[] {
    return XOrderBy(
      data,
      sort.map((x) => x.field!),
      sort.map((x) => x.value) as ('desc' | 'asc')[]
    ) as User[] | XGroupItem[];
  }
}

export interface User extends XId {
  name?: string;
  account?: string;
  password?: string;
  email?: string;
  phone?: string;
  organization?: string;
  [property: string]: any;
}