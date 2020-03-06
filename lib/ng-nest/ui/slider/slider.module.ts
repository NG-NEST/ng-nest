import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XSliderComponent } from './slider.component';

@NgModule({
  declarations: [XSliderComponent],
  exports: [XSliderComponent],
  imports: [CommonModule]
})
export class XSliderModule {}
