import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { XId, XResultList } from '@ng-nest/ui/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getList(filter: { [property: string]: any }) {
    return this.http.get<XResultList<User>>(`/api/users`, { params: filter });
  }

  get(id: string) {
    return this.http.get<User>(`/api/users/${id}`);
  }

  post(user: User) {
    return this.http.post<User>(`/api/users`, user);
  }

  put(user: User) {
    return this.http.put<User>(`/api/users`, user);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`/api/users/${id}`);
  }
}

export interface User extends XId{
  id: string;
  name: string;
  account: string;
  email: string;
  phone: string;
}
