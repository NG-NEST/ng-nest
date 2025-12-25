import { Routes } from '@angular/router';
import { environment } from '@environments';

export const MainRoutes: Routes = [
  {
    path: `${environment.layout}`,
    loadChildren: () => import('../main/layout/layout-routes.module').then((x) => x.LayoutRoutes)
  },
  { path: '', redirectTo: `${environment.layout}`, pathMatch: 'full' },

  {
    path: 'no-auth',
    loadChildren: () => import('../main/no-auth/no-auth-routes.module').then((x) => x.NoAuthRoutes)
  },
  {
    path: '**',
    loadChildren: () => import('../main/exception/404-routes.module').then((x) => x.Exception404Routes)
  }
];

export const TestRoutes: Routes = [
  { path: '', redirectTo: `test`, pathMatch: 'full' },
  {
    path: `test`,
    loadChildren: () => import('../main/test/test-routes.module').then((x) => x.TestRoutes)
  }
];
