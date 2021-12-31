import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test.component';

const routes: Routes = [
  {
    path: '',
    component: TestComponent,
    children: [
      {
        path: 'table',
        loadChildren: () => import('./modules/table/table.module').then((x) => x.TeTableModule)
      },
      {
        path: 'carousel',
        loadChildren: () => import('./modules/carousel/carousel.module').then((x) => x.TeCarouselModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutesModule {}
