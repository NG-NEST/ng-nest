import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule } from '@angular/router';
import { XTableModule } from '@ng-nest/ui/table';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XFormModule } from '@ng-nest/ui/form';
import { XMessageModule } from '@ng-nest/ui/message';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XMessageBoxModule } from '@ng-nest/ui/message-box';

@NgModule({
  declarations: [UserComponent, UserDetailComponent],
  imports: [
    CommonModule,
    XTableModule,
    XButtonComponent,
    XFormModule,
    XMessageModule,
    XLinkComponent,
    XMessageBoxModule,
    RouterModule.forChild([
      { path: '', component: UserComponent },
      { path: ':type', component: UserDetailComponent },
      { path: ':type/:id', component: UserDetailComponent }
    ])
  ],
  exports: [RouterModule]
})
export class UserModule {}
