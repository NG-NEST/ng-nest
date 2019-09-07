import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

/**
 * 预加载模块服务
 *
 * @export
 * @class SelectivePreloadingStrategy
 * @implements {PreloadingStrategy}
 */
@Injectable()
export class SelectivePreloadingStrategy implements PreloadingStrategy {
  // 需要预加载的模块
  preloadedModules: string[] = [];

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
      this.preloadedModules.push(route.path);
      return load();
    } else {
      return of(null);
    }
  }
}