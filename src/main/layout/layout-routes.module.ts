import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { environment } from '@environments';

export const LayoutRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: environment.defaultPage, pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: () => import('../home/home-routes.module').then((x) => x.HomeRoutes)
      },
      {
        path: 'demo',
        loadChildren: () => import('../demo/demo-routes.module').then((x) => x.DemoRoutes)
      },
      {
        path: 'docs',
        loadChildren: () => import('../docs/docs-routes.module').then((x) => x.DocRoutes)
      },
      {
        path: 'news',
        loadChildren: () => import('../news/news-routes.module').then((x) => x.NewsRoutes)
      },
      {
        path: 'no-auth',
        loadChildren: () => import('../no-auth/no-auth-routes.module').then((x) => x.NoAuthRoutes)
      },
      {
        path: '**',
        loadChildren: () => import('../exception/404-routes.module').then((x) => x.Exception404Routes)
      }
    ]
  }
];
