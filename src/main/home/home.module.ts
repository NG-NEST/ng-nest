import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutesModule } from './home-routes.module';
import { XButtonModule } from '@ng-nest/ui/button';

@NgModule({
  imports: [HomeRoutesModule, XButtonModule],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule {}
