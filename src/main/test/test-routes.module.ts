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
      },
      {
        path: 'select',
        loadChildren: () => import('./modules/select/select.module').then((x) => x.TeSelectModule)
      },
      {
        path: 'drawer',
        loadChildren: () => import('./modules/drawer/drawer.module').then((x) => x.TeDrawerModule)
      },
      {
        path: 'dialog',
        loadChildren: () => import('./modules/dialog/dialog.module').then((x) => x.TeDialogModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutesModule {}
