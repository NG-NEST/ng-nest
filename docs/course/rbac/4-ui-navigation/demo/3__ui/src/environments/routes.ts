import { Routes } from '@angular/router';

// 一级路由配置，主要是指向框架页
export const layoutRoutes: Routes = [
  // 如果路由为空就指向 index
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  // index
  {
    path: 'index',
    loadChildren: () => import('../layout/index/index.module').then((x) => x.IndexModule)
  }
];

// 二级路由配置，主要是指向业务模块
export const mainRoutes: Routes = [
  // 如果路由为空就指向配置的默认首页
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // 首页
  {
    path: 'home',
    loadChildren: () => import('../main/home/home.module').then((x) => x.HomeModule)
  },
  // 仪表盘
  {
    path: 'dashboard',
    loadChildren: () => import('../main/dashboard/dashboard.module').then((x) => x.DashboardModule)
  },
  // 用户管理
  {
    path: 'users',
    loadChildren: () => import('../main/system/users/user.module').then((x) => x.UserModule)
  },
  // 角色管理
  {
    path: 'roles',
    loadChildren: () => import('../main/system/roles/role.module').then((x) => x.RoleModule)
  },
  // 组织管理
  {
    path: 'organization',
    loadChildren: () => import('../main/system/organization/organization.module').then((x) => x.OrganizationModule)
  },
  // 菜单管理
  {
    path: 'menus',
    loadChildren: () => import('../main/system/menus/menu.module').then((x) => x.MenuModule)
  }
];
