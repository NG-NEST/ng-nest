import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export interface XRouteReuseStorage {
  id: string;
  handle: DetachedRouteHandle;
}

export class XReuseStrategyService implements RouteReuseStrategy {
  public static storages: XRouteReuseStorage[] = [];
  private static waitDelete: string | null;

  public shouldDetach(_route: ActivatedRouteSnapshot): boolean {
    return true;
  }

  public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    if (handle == null) return;
    if (XReuseStrategyService.waitDelete && this.getRouteUrl(route).indexOf(XReuseStrategyService.waitDelete) == 0) {
      XReuseStrategyService.waitDelete = null;
      return;
    }
    this.add(this.getRouteUrl(route), handle);
  }

  public shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!XReuseStrategyService.storages.find((x) => x.id == this.getRouteUrl(route));
  }

  public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if (!route.routeConfig) {
      return {};
    }
    let stroage = XReuseStrategyService.storages.find((x) => x.id == this.getRouteUrl(route));
    return stroage ? stroage.handle : {};
  }

  public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig && JSON.stringify(future.params) == JSON.stringify(curr.params);
  }

  private getRouteUrl(route: ActivatedRouteSnapshot) {
    let url = route.url.map((x) => x.path).join('_');
    return url;
  }

  public static deleteRouteSnapshot(name?: string): void {
    if (name) {
      let id = name.replace(/\//g, '_');
      XReuseStrategyService.storages.splice(
        XReuseStrategyService.storages.findIndex((x) => x.id.indexOf(id) === 0),
        1
      );
      XReuseStrategyService.waitDelete = id;
    } else {
      XReuseStrategyService.storages = [];
    }
  }

  private add(id: string, handle: DetachedRouteHandle) {
    XReuseStrategyService.storages.splice(
      XReuseStrategyService.storages.findIndex((x) => x.id == id),
      1
    );
    XReuseStrategyService.storages = [...XReuseStrategyService.storages, { id: id, handle: handle }];
  }
}
