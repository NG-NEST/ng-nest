import { Injectable } from '@angular/core';
import { XRepositoryAbstract, XQuery, XResultList, XGroupItem, XFilter, XChunk, XSort, XId, XOrderBy } from '@ng-nest/ui/core';
import { Observable } from 'rxjs';

@Injectable()
export class ScrollService extends XRepositoryAbstract {
  organizations = ['Manufacturing Center', 'R&D Center', 'Finance Center', 'Marketing Center', 'Administrative Center'];
  positions = ['Technician', 'Sales', 'Manager', 'Director', 'Production'];
  users: User[] = Array.from({ length: 123456 }).map((_x, i) => {
    i++;
    return {
      id: i,
      name: 'My name is Zhang San ' + i + '. My name is Zhang San ' + i + '.',
      position: this.positions[Math.floor(Math.random() * 10 + 1) % 5],
      email: 'email' + i,
      phone: 'phone' + i,
      organization: this.organizations[Math.floor(Math.random() * 10 + 1) % 5]
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
        result = result.filter((y) => y[x.field!].indexOf(x.value) >= 0);
      });
    }
    return result;
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
