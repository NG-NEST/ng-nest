import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
import * as _ from 'lodash';

export interface XRouteReuseStorage {
  id: string;
  handle: DetachedRouteHandle;
}

// @dynamic
export class XReuseStrategyService implements RouteReuseStrategy {
  // 存储的复用路由
  public static storages: XRouteReuseStorage[] = [];
  // 用一个临时变量记录待删除的路由
  private static waitDelete: string;

  /**
   * 表示对所有路由允许复用 如果你有路由不想利用可以在这加一些业务逻辑判断
   */
  public shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return true;
  }

  /**
   * 当路由离开时会触发。按path作为key存储路由快照&组件当前实例对象
   */
  public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    if (handle == null) return;
    if (XReuseStrategyService.waitDelete && this.getRouteUrl(route).indexOf(XReuseStrategyService.waitDelete) == 0) {
      //如果待删除是当前路由则不存储快照
      XReuseStrategyService.waitDelete = null;
      return;
    }
    this.add(this.getRouteUrl(route), handle);
  }

  /**
   * 若 path 在缓存中有的都认为允许还原路由
   */
  public shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!_.find(XReuseStrategyService.storages, x => x.id == this.getRouteUrl(route));
  }

  /**
   * 从缓存中获取快照，若无则返回nul
   */
  public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if (!route.routeConfig) {
      return null;
    }
    let stroage = _.find(XReuseStrategyService.storages, x => x.id == this.getRouteUrl(route));
    return stroage ? stroage.handle : null;
  }

  /**
   * 进入路由触发，判断是否同一路由
   * 解决不同的参数也会认为是同一个路由，导致会将之前的路由拿出来复用
   */
  public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig && JSON.stringify(future.params) == JSON.stringify(curr.params);
  }

  /**
   * 解决不同的主路由会存在相同名称的子路由
   */
  private getRouteUrl(route: ActivatedRouteSnapshot) {
    let url = route['_routerState'].url.replace(/\//g, '_');
    return url;
  }

  /**
   * 删除复用的路由
   */
  public static deleteRouteSnapshot(name?: string): void {
    if (name) {
      let id = name.replace(/\//g, '_');
      _.remove(XReuseStrategyService.storages, x => x.id.indexOf(id) === 0);
      XReuseStrategyService.waitDelete = id;
    } else {
      XReuseStrategyService.storages = [];
    }
  }

  private add(id: string, handle: DetachedRouteHandle) {
    _.remove(XReuseStrategyService.storages, x => x.id == id);
    XReuseStrategyService.storages = [...XReuseStrategyService.storages, { id: id, handle: handle }];
  }
}
