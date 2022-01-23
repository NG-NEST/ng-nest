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
      },
      {
        path: 'progress',
        loadChildren: () => import('./modules/progress/progress.module').then((x) => x.TeProgressModule)
      },
      {
        path: 'steps',
        loadChildren: () => import('./modules/steps/steps.module').then((x) => x.TeStepsModule)
      },
      {
        path: 'popconfirm',
        loadChildren: () => import('./modules/popconfirm/popconfirm.module').then((x) => x.TePopconfirmModule)
      },
      {
        path: 'message',
        loadChildren: () => import('./modules/message/message.module').then((x) => x.TeMessageModule)
      },
      {
        path: 'alert',
        loadChildren: () => import('./modules/alert/alert.module').then((x) => x.TeAlertModule)
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
