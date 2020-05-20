import { Routes } from '@angular/router';
import { environment } from './environment';

export const shareRoutes: Routes = [
  {
    path: 'no-auth',
    loadChildren: () => import('../main/no-auth/no-auth.module').then((x) => x.NoAuthModule)
  },
  {
    path: '**',
    loadChildren: () => import('../main/exception/404.module').then((x) => x.Exception404Module)
  }
];

export const mainRoutes: Routes = [
  {
    path: environment.layout,
    loadChildren: () => import('../main/layout/layout.module').then((x) => x.LayoutModule)
  },
  { path: '', redirectTo: environment.layout, pathMatch: 'full' },

  ...shareRoutes
];

/**
 * DocModule 文档模块通过命令生成
 */
export const layoutRoutes: Routes = [
  { path: '', redirectTo: environment.defaultPage, pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('../main//home/home.module').then((x) => x.HomeModule) },
  { path: 'demo', loadChildren: () => import('../main/demo/demo.module').then((x) => x.DemoModule) },
  { path: 'docs', loadChildren: () => import('../main/docs/docs.module').then((x) => x.NsDocsModule) },
  { path: 'news', loadChildren: () => import('../main/news/news.module').then((x) => x.NewsModule) },

  ...shareRoutes
];

export interface Menu {
  id?: string;
  pid?: string | null;
  label?: string;
  name?: string;
  enLabel?: string;
  router?: string;
  icon?: string;
  type?: string;
  order?: number;
  category?: string;
  [prop: string]: any;
}
