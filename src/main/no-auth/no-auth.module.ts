import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoAuthComponent } from './no-auth.component';
import { NoAuthRoutesModule } from './no-auth-routes.module';

@NgModule({
  imports: [CommonModule, NoAuthRoutesModule],
  declarations: [NoAuthComponent],
  exports: [NoAuthComponent]
})
export class NoAuthModule {}
