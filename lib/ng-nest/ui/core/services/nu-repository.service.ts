import { NuRepositoryOption } from "./nu-repository.service";
import { NuId, NuQuery, NuResultList } from "../interfaces";
import { NuHttpService } from "./nu-http.service";
import { Observable } from "rxjs";

export interface NuRepositoryOption {
  controller: NuController;
}

export interface NuController {
  name: string;
}

export abstract class NuRepositoryAbstract {
  abstract getList(index?: number, size?: number, query?: NuQuery): Observable<NuResultList<any>>;
  abstract get(id: number | string): Observable<any>;
  abstract post(entity: any): Observable<any>;
  abstract put(entity: any): Observable<any>;
  abstract delete(id: number | string): Observable<boolean>;
}

export class NuRepositoryService<Entity extends NuId> extends NuRepositoryAbstract {
  constructor(public http: NuHttpService, public option: NuRepositoryOption) {
    super();
  }

  getList(index?: number, size?: number, query?: NuQuery): Observable<NuResultList<Entity>> {
    index = index ? index : 1;
    size = size ? size : 10;
    return this.http.post(`${this.option.controller.name}/${size}/${index}`, query);
  }

  get(id: number | string): Observable<Entity> {
    return this.http.get(`${this.option.controller.name}/${id}`);
  }

  post(entity: Entity): Observable<Entity> {
    return this.http.post(`${this.option.controller.name}`, entity);
  }

  put(entity: Entity): Observable<Entity> {
    return this.http.put(`${this.option.controller.name}`, entity);
  }

  delete(id: number | string): Observable<boolean> {
    return this.http.delete(`${this.option.controller.name}/${id}`);
  }
}
