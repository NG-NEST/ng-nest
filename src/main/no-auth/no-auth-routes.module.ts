import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthComponent } from './no-auth.component';

const routes: Routes = [{ path: '', component: NoAuthComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoAuthRoutesModule {}
