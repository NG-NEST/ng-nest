import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // 如果路由为空就指向 index
  // 比如 http://locahost:4200/ => http://locahost:4200/index
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  // index
  {
    path: 'index',
    loadChildren: () =>
      import('../layout/index/index.module').then((x) => x.IndexModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
