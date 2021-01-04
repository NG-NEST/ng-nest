import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class UserModule {}
