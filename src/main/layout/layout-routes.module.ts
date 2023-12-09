import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { LayoutRoutes as LRoutes } from '../../app/app.routes';

export const LayoutRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: LRoutes
  }
];
