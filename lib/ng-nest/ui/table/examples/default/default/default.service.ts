import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { XId, XGroupItem, XSort, XFilter, XIsEmpty, XQuery, XResultList, XRepositoryAbstract } from '@ng-nest/ui/core';
import * as _ from 'lodash';

@Injectable()
export class DefaultService extends XRepositoryAbstract {
  organizations = ['制造中心', '研发中心', '财务中心', '营销中心', '行政中心'];
  positions = ['技术员', '销售', '经理', '总监', '生产员'];
  users: User[] = Array.from({ length: 1234 }).map((x, i) => {
    i++;
    return {
      id: i,
      name: '姓名' + i,
      position: this.positions[Math.floor(Math.random() * 10 + 1) % 5],
      email: '邮箱' + i,
      phone: '手机' + i,
      organization: this.organizations[Math.floor(Math.random() * 10 + 1) % 5]
    };
  });

  getList(index?: number, size?: number, query?: XQuery): Observable<XResultList<User | XGroupItem>> {
    return Observable.create(x => {
      let data: User[] | XGroupItem[] = [];
      data = this.setFilter(this.users, query.filter);
      if (!XIsEmpty(query.group)) {
        data = this.setGroup(data, query.group);
      }
      if (!XIsEmpty(query.sort)) {
        data = this.setSort(data, query.sort);
      }
      let chunks = _.chunk(data, size);
      if (index <= chunks.length) {
        x.next({ total: data.length, list: chunks[index - 1] });
      } else {
        x.next({ total: data.length, list: [] });
      }
      x.complete();
    });
  }
  get(id: number | string): Observable<User> {
    return;
  }
  post(entity: User): Observable<User> {
    return;
  }
  put(entity: User): Observable<User> {
    return;
  }
  delete(id: number | string): Observable<boolean> {
    return;
  }

  private setFilter(data: User[], filters: XFilter[]): User[] {
    let result = data;
    if (filters && filters.length > 0) {
      filters.forEach((x, index) => {
        result = result.filter(y => y[x.field].indexOf(x.value) >= 0);
      });
    }
    return result;
  }

  private setGroup(data: User[], group: string): XGroupItem[] {
    return _.map(_.groupBy(data, group), (value, key) => {
      let groupItem: XGroupItem = { id: key, count: value.length };
      groupItem[group] = key;
      return groupItem;
    });
  }

  private setSort(data: User[] | XGroupItem[], sort: XSort[]): User[] | XGroupItem[] {
    return _.orderBy(
      data,
      _.map(sort, x => x.field),
      _.map(sort, x => x.value) as ('desc' | 'asc')[]
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
}
