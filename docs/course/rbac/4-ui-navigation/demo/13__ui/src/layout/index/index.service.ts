import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { XMenuNode } from '@ng-nest/ui/menu';
import { filter } from 'rxjs/operators';
import { drop } from 'lodash';
import { XCrumbNode } from '@ng-nest/ui/crumb';

@Injectable({ providedIn: 'root' })
export class IndexService {
  menus: MenuNode[] = [
    { id: 1, label: '首页', icon: 'ado-home', routerLink: './home' },
    { id: 2, label: '仪表盘', icon: 'ado-radar-chart', routerLink: './dashboard' },
    { id: 3, label: '系统管理', icon: 'ado-setting' },
    { id: 4, pid: 3, label: '用户管理', icon: 'ado-team', routerLink: './users' },
    { id: 5, pid: 3, label: '角色管理', icon: 'ado-user', routerLink: './roles' },
    { id: 6, pid: 3, label: '组织管理', icon: 'ado-apartment', routerLink: './organization' },
    { id: 7, pid: 3, label: '菜单管理', icon: 'fto-menu', routerLink: './menus' }
  ];

  tabs: TabNode[] = [];

  crumbs: XCrumbNode[] = [];

  session: Session = {};

  constructor(private router: Router) {
    this.router.events.pipe(filter((x) => x instanceof NavigationEnd)).subscribe(() => {
      this.setTabs();
      this.setCrumbs();
    });
  }

  setTabs() {
    let url = this.getUrl(this.router.url);
    let routers = url.path.split('/');
    if (routers.length > 2) {
      let router = routers[2];
      let subPage = routers.length > 3 ? drop(routers, 3).join('/') : undefined;
      let param = url.param;
      let menu = this.menus.find((x) => x.routerLink == `./${router}`);
      if (typeof menu !== 'undefined') {
        let tab = this.tabs.find((x) => x.routerLink === menu!.routerLink);
        if (tab) {
          tab.subPage = subPage;
          tab.param = param;
        } else {
          menu.subPage = subPage;
          menu.param = param;
          this.tabs = [menu as TabNode, ...this.tabs];
        }
        this.session = {
          activatedPage: router,
          subPage: subPage,
          param: param
        };
      }
    }
  }

  setCrumbs() {
    let menu = this.menus.find((x) => x.routerLink === `./${this.session.activatedPage}`);
    let crumbs: XCrumbNode[] = [];
    let addParent = (item: MenuNode) => {
      if (item.pid === null && item.pid === '') return;
      let parent = this.menus.find((x) => x.id === item.pid);
      if (parent) {
        crumbs.unshift({
          id: parent.id,
          label: parent.label,
          data: parent
        });
        addParent(parent);
      }
    };
    if (menu) {
      crumbs.push({ id: menu.id, label: menu.label, data: menu });
      addParent(menu);
    }
    this.crumbs = crumbs;
  }

  getUrl(path: string): { path: string; param: { [property: string]: string } } {
    let result: { path: string; param: { [prop: string]: string } } = {
      path: '',
      param: {}
    };
    if (path.indexOf(';') > -1) {
      let spt = path.split(';');
      result.path = spt[0];
      for (let i = 1; i < spt.length; i++) {
        let st = spt[i].split('=');
        result.param[st[0]] = st[1];
      }
    } else {
      result.path = path;
    }
    return result;
  }
}

export interface MenuNode extends XMenuNode {
  subPage?: string;
  param?: { [property: string]: string };
}

export interface TabNode extends MenuNode {
  routerLink?: string;
}

export interface Session extends MenuNode {
  activatedPage?: string;
}
