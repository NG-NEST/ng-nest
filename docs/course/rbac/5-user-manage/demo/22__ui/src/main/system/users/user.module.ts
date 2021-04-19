import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule } from '@angular/router';
import { XTableModule } from '@ng-nest/ui/table';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  declarations: [UserComponent, UserDetailComponent],
  imports: [
    CommonModule,
    XTableModule,
    RouterModule.forChild([
      { path: '', component: UserComponent },
      { path: ':type', component: UserDetailComponent },
      { path: ':type/:id', component: UserDetailComponent }
    ])
  ],
  exports: [RouterModule]
})
export class UserModule {}
