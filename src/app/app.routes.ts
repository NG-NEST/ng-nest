import { Routes } from '@angular/router';
// import { environment } from '@environments';

export const ShareRoutes: Routes = [
  {
    path: 'no-auth',
    loadChildren: () => import('../main/no-auth/no-auth-routes.module').then((x) => x.NoAuthRoutes)
  },
  // {
  //   path: '**',
  //   loadChildren: () => import('../main/exception/404-routes.module').then((x) => x.Exception404Routes)
  // },
  // { path: '**', loadChildren: () => import('../main/api/api-routes.module').then((x) => x.ApiRoutes) }
  {
    path: '**',
    loadComponent: () =>
      import('../main/test/auto-complete/auto-complete.component').then((x) => x.TeAutoCompleteComponent)
  }
];

export const MainRoutes: Routes = [
  // {
  //   path: `${environment.layout}`,
  //   loadChildren: () => import('../main/layout/layout-routes.module').then((x) => x.LayoutRoutes)
  // },
  // { path: '', redirectTo: `${environment.layout}`, pathMatch: 'full' },

  ...ShareRoutes
];

export const TestRoutes: Routes = [
  // { path: '', redirectTo: `test`, pathMatch: 'full' },
  // {
  //   path: `test`,
  //   loadChildren: () => import('../main/test/test-routes.module').then((x) => x.TestRoutes)
  // }
];

/**
 * DocModule 文档模块通过命令生成
 */
export const LayoutRoutes: Routes = [
  // { path: '', redirectTo: environment.defaultPage, pathMatch: 'full' },
  // {
  //   path: 'home',
  //   loadChildren: () => import('../main/home/home-routes.module').then((x) => x.HomeRoutes)
  // },
  // {
  //   path: 'demo',
  //   loadChildren: () => import('../main/demo/demo-routes.module').then((x) => x.DemoRoutes)
  // },
  // {
  //   path: 'docs',
  //   loadChildren: () => import('../main/docs/docs-routes.module').then((x) => x.DocRoutes)
  // },
  // {
  //   path: 'news',
  //   loadChildren: () => import('../main/news/news-routes.module').then((x) => x.NewsRoutes)
  // },
  // ...ShareRoutes
];
