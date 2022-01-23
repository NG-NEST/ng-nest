import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TestComponent } from './test.component';

const routes: Routes = [
  {
    path: '',
    component: TestComponent,
    children: [
      {
        path: 'find',
        loadChildren: () => import('./modules/find/find.module').then((x) => x.TeFindModule)
      },
      {
        path: 'form',
        loadChildren: () => import('./modules/form/form.module').then((x) => x.TeFormModule)
      },
      { path: '', redirectTo: environment.defaultPage, pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutesModule {}
