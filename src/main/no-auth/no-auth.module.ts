import { NgModule } from '@angular/core';
import { NoAuthComponent } from './no-auth.component';
import { NoAuthRoutesModule } from './no-auth-routes.module';

@NgModule({
  imports: [NoAuthRoutesModule],
  declarations: [NoAuthComponent],
  exports: [NoAuthComponent]
})
export class NoAuthModule {}
