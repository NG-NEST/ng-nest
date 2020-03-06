import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { layoutRoutes } from '../../environments/routes';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: layoutRoutes
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutesModule {}
