import { Injectable } from '@angular/core';
import { XRepositoryAbstract, XQuery, XResultList, XGroupItem, XFilter, XChunk, XSort, XId, XOrderBy } from '@ng-nest/ui/core';
import { Observable } from 'rxjs';

@Injectable()
export class DefaultService extends XRepositoryAbstract {
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
  users: User[] = Array.from({ length: 123456 }).map((_x, i) => {
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

  private setSort(data: User[] | XGroupItem[], sort: XSort[]): User[] | XGroupItem[] {
    return XOrderBy(
      data,
      sort.map(x=> x.field),
      sort.map(x=> x.value) as ('desc' | 'asc')[]
    ) as User[] | XGroupItem[];
  }
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
  [property: string]: any;
}
