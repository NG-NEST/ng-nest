import { Injectable } from '@angular/core';
import { XMenuNode } from '@ng-nest/ui/menu';

@Injectable({ providedIn: 'root' })
export class IndexService {
  menus: XMenuNode[] = [
    { id: 1, label: '首页', icon: 'ado-home', routerLink: './home' },
    { id: 2, label: '仪表盘', icon: 'ado-radar-chart', routerLink: './dashboard' },
    { id: 3, label: '系统管理', icon: 'ado-setting' },
    { id: 4, pid: 3, label: '用户管理', icon: 'ado-team', routerLink: './users' },
    { id: 5, pid: 3, label: '角色管理', icon: 'ado-user', routerLink: './roles' },
    { id: 6, pid: 3, label: '组织管理', icon: 'ado-apartment', routerLink: './organization' },
    { id: 7, pid: 3, label: '菜单管理', icon: 'fto-menu', routerLink: './menus' }
  ];
}
