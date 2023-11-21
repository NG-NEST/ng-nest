import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutesModule } from './home-routes.module';
import { XButtonComponent } from '@ng-nest/ui/button';

@NgModule({
  imports: [HomeRoutesModule, XButtonComponent],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule {}
