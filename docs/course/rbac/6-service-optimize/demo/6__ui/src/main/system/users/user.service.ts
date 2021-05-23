import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { XId } from '@ng-nest/ui/core';
import { RepositoryService } from 'src/services/repository.service';

@Injectable({ providedIn: 'root' })
export class UserService extends RepositoryService<User> {
  constructor(http: HttpClient) {
    super(http, { controller: { name: '/api/users' } });
  }
}

export interface User extends XId {
  name: string;
  account: string;
  email: string;
  phone: string;
}
