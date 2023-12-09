import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule } from '@angular/router';
import { XTableComponent } from '@ng-nest/ui/table';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XFormComponent } from '@ng-nest/ui/form';
import { XLinkComponent } from '@ng-nest/ui/link';

@NgModule({
  declarations: [UserComponent, UserDetailComponent],
  imports: [
    CommonModule,
    XTableComponent,
    XButtonComponent,
    XFormComponent,
    XLinkComponent,
    RouterModule.forChild([
      { path: '', component: UserComponent },
      { path: ':type', component: UserDetailComponent },
      { path: ':type/:id', component: UserDetailComponent }
    ])
  ],
  exports: [RouterModule]
})
export class UserModule {}
