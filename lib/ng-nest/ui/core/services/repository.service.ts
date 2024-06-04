import { XHttpService } from './http.service';
import { Observable } from 'rxjs';
import type { XId, XQuery, XResultList } from '../interfaces';

export interface XRepositoryInput {
  api?: string;
  controller: XController;
}

export interface XController {
  name: string;
}

export abstract class XRepositoryAbstract {
  abstract getList(index?: number, size?: number, query?: XQuery): Observable<XResultList<any>>;
  abstract get(id: number | string): Observable<any>;
  abstract post(entity: any): Observable<any>;
  abstract put(entity: any): Observable<any>;
  abstract delete(id: number | string): Observable<boolean>;
}

export class XRepositoryService<Entity extends XId> extends XRepositoryAbstract {
  api = '';
  constructor(
    public http: XHttpService,
    public input: XRepositoryInput
  ) {
    super();
    this.api = typeof input.api !== 'undefined' ? input.api : '';
  }

  getList(index?: number, size?: number, query?: XQuery): Observable<XResultList<Entity>> {
    index = index ? index : 1;
    size = size ? size : 10;
    return this.http.post(`${this.api}${this.input.controller.name}/${size}/${index}`, query);
  }

  get(id: number | string): Observable<Entity> {
    return this.http.get(`${this.api}${this.input.controller.name}/${id}`);
  }

  post(entity: Entity): Observable<Entity> {
    return this.http.post(`${this.api}${this.input.controller.name}`, entity);
  }

  put(entity: Entity): Observable<Entity> {
    return this.http.put(`${this.api}${this.input.controller.name}`, entity);
  }

  delete(id: number | string): Observable<boolean> {
    return this.http.delete(`${this.api}${this.input.controller.name}/${id}`);
  }
}
