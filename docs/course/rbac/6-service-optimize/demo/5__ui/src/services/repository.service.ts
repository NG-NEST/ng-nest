import { XId, XResultList } from '@ng-nest/ui/core';
import { HttpClient } from '@angular/common/http';
import { XQuery } from '@ng-nest/ui/core';
import { HttpParams } from '@angular/common/http';

export interface Controller {
  name?: string;
}

export interface RepositoryOption {
  controller?: Controller;
}

export class RepositoryService<Entity extends XId> {
  constructor(public http: HttpClient, public option: RepositoryOption) {}

  getList(query: XQuery) {
    return this.http.get<XResultList<Entity>>(`${this.option.controller?.name}`, {
      params: query as HttpParams
    });
  }

  get(id: number | string) {
    return this.http.get<Entity>(`${this.option.controller?.name}/${id}`);
  }

  post(entity: Entity) {
    return this.http.post<Entity>(`${this.option.controller?.name}`, entity);
  }

  put(entity: Entity) {
    return this.http.put<Entity>(`${this.option.controller?.name}`, entity);
  }

  delete(id: number | string) {
    return this.http.delete<boolean>(`${this.option.controller?.name}/${id}`);
  }
}
