import { NmRepositoryOption } from "./nm-repository.service";
import { NmId, NmQuery, NmResultList } from "../interfaces";
import { NmHttpService } from "./nm-http.service";
import { Observable } from "rxjs";

export interface NmRepositoryOption {
  controller: NmController;
}

export interface NmController {
  name: string;
}

export abstract class NmRepositoryAbstract {
  abstract getList(index?: number, size?: number, query?: NmQuery): Observable<NmResultList<any>>;
  abstract get(id: number | string): Observable<any>;
  abstract post(entity: any): Observable<any>;
  abstract put(entity: any): Observable<any>;
  abstract delete(id: number | string): Observable<boolean>;
}

export class NmRepositoryService<Entity extends NmId> extends NmRepositoryAbstract {
  constructor(public http: NmHttpService, public option: NmRepositoryOption) {
    super();
  }

  getList(index?: number, size?: number, query?: NmQuery): Observable<NmResultList<Entity>> {
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
