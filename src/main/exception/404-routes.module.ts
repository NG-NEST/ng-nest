import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Exception404Component } from './404.component';

const routes: Routes = [{ path: '', component: Exception404Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Exception404RoutesModule {}
