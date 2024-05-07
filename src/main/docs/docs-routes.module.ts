import { Routes } from '@angular/router';
import { NsDocsComponent } from './docs.component';

export const DocRoutes: Routes = [
  {
    path: '',
    component: NsDocsComponent,
    children: [
      { path: '', redirectTo: 'zh_CN', pathMatch: 'full' },
      {
        path: 'zh_CN',
        loadChildren: () => import('./zh_CN/docs-zh_CN-routes.module').then((x) => x.NsDocsZhCNRoutes)
      },
      {
        path: 'en_US',
        loadChildren: () => import('./en_US/docs-en_US-routes.module').then((x) => x.NsDocsEnUSRoutes)
      }
    ]
  }
];
