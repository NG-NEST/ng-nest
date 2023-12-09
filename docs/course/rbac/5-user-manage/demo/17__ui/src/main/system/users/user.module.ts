import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule } from '@angular/router';
import { XTableComponent } from '@ng-nest/ui/table';

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    XTableComponent,
    RouterModule.forChild([
      {
        path: '',
        component: UserComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class UserModule {}
