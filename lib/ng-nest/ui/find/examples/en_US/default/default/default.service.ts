import { Injectable } from '@angular/core';
import { XRepositoryAbstract, XQuery, XResultList, XGroupItem, XFilter, chunk, groupBy, XSort, XId } from '@ng-nest/ui/core';
import { Observable } from 'rxjs';
import { map, orderBy } from 'lodash';
import { XTreeNode } from '@ng-nest/ui/tree';

@Injectable()
export class TableServiceTest extends XRepositoryAbstract {
  organizations = [
    'LeiHao group',
    'Enterprises develop',
    'Social networking',
    'Interactive entertainment',
    'Mobile Internet',
    'Network media',
    'Personnel department',
    'Administration department',
    'Accounting department'
  ];
  positions = ['Technician', 'Sales', 'Manager', 'Director', 'Production'];
  users: User[] = Array.from({ length: 123456 }).map((x, i) => {
    i++;
    let positionId = Math.floor(Math.random() * 5 + 1);
    let organizationId = Math.floor(Math.random() * 9 + 1);
    return {
      id: i,
      label: 'name' + i,
      positionId: positionId,
      position: this.positions[positionId - 1],
      email: 'email' + i,
      phone: 'phone' + i,
      organizationId: organizationId,
      organization: this.organizations[organizationId - 1]
    };
  });

  getList(index: number, size: number, query?: XQuery): Observable<XResultList<User | XGroupItem>> {
    return new Observable((x) => {
      let data: User[] | XGroupItem[] = [];
      data = this.setFilter(this.users, query?.filter as XFilter[]);
      if (query?.group) {
        console.log(data, index, size, query);
      }
      if (query?.sort) {
        data = this.setSort(data, query.sort);
      }
      let chunks = chunk(data, size);
      if ((index as number) <= chunks.length) {
        x.next({ total: data.length, list: chunks[index - 1] });
      } else {
        x.next({ total: data.length, list: [] });
      }
      x.complete();
    });
  }
  get(id: number | string): Observable<User> {
    return new Observable();
  }
  post(entity: User): Observable<User> {
    return new Observable();
  }
  put(entity: User): Observable<User> {
    return new Observable();
  }
  delete(id: number | string): Observable<boolean> {
    return new Observable();
  }

  private setFilter(data: User[], filters: XFilter[]): User[] {
    let result = data;
    if (filters && filters.length > 0) {
      filters.forEach((x) => {
        switch (x.operation) {
          case '=':
            result = result.filter((y) => y[x.field] === x.value);
            break;
          case '>':
            result = result.filter((y) => y[x.field] > x.value);
            break;
          case '>=':
            result = result.filter((y) => y[x.field] >= x.value);
            break;
          case '<':
            result = result.filter((y) => y[x.field] < x.value);
            break;
          case '<=':
            result = result.filter((y) => y[x.field] <= x.value);
            break;
          default:
            // '%'
            result = result.filter((y) => y[x.field].indexOf(x.value) >= 0);
            break;
        }
      });
    }
    return result;
  }

  private setGroup(data: User[], group: string): XGroupItem[] {
    return map(groupBy(data, group), (value, key) => {
      let groupItem: XGroupItem = { id: key, count: value.length };
      groupItem[group] = key;
      return groupItem;
    });
  }

  private setSort(data: User[] | XGroupItem[], sort: XSort[]): User[] | XGroupItem[] {
    return orderBy(
      data,
      map(sort, (x) => x.field),
      map(sort, (x) => x.value) as ('desc' | 'asc')[]
    ) as User[] | XGroupItem[];
  }
}

@Injectable()
export class TreeServiceTest {
  data: XTreeNode[] = [
    { id: 1, label: 'LeiHao group' },
    { id: 2, label: 'Enterprises develop', pid: 1 },
    { id: 3, label: 'Social networking', pid: 1 },
    { id: 4, label: 'Interactive entertainment', pid: 1 },
    { id: 5, label: 'Mobile Internet', pid: 1 },
    { id: 6, label: 'Network media', pid: 1 },
    { id: 7, label: 'Personnel department', pid: 4 },
    { id: 8, label: 'Administration department', pid: 4 },
    { id: 9, label: 'Accounting department', pid: 4 }
  ];

  getTreeList = (pid = undefined): Observable<XTreeNode[]> => {
    return new Observable((x) => {
      let result = this.data
        .filter((y) => y.pid === pid)
        .map((x) => {
          x.leaf = this.data.find((y) => y.pid === x.id) ? true : false;
          return x;
        });
      setTimeout(() => {
        x.next(result);
        x.complete();
      }, 500);
    });
  };
}

interface User extends XId {
  name?: string;
  account?: string;
  password?: string;
  email?: string;
  phone?: string;
  position?: string;
  positionId?: number;
  organization?: string;
  organizationId?: number;
  [prop: string]: any;
}
