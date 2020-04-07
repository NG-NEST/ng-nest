import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutesModule } from './home-routes.module';

@NgModule({
  imports: [HomeRoutesModule],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule {}
