import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutesModule } from './home-routes.module';
import { ShareModule } from 'src/share/share.module';

@NgModule({
  imports: [CommonModule, HomeRoutesModule, ShareModule],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule {}
