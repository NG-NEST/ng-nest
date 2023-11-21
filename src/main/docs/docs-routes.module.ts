import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NsDocsComponent } from './docs.component';

const routes: Routes = [
  {
    path: '',
    component: NsDocsComponent,
    children: [
      { path: '', redirectTo: 'zh_CN', pathMatch: 'full' },
      // {
      //   path: 'zh_CN',
      //   loadChildren: () => import('./zh_CN/docs-zh_CN.module').then((x) => x.NsDocsZhCNModule)
      // },
      // {
      //   path: 'en_US',
      //   loadChildren: () => import('./en_US/docs-en_US.module').then((x) => x.NsDocsEnUSModule)
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsDocsRoutesModule {}
