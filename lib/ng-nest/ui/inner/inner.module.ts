import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XInnerComponent } from './inner.component';

@NgModule({
  declarations: [XInnerComponent],
  exports: [XInnerComponent],
  imports: [CommonModule]
})
export class XInnerModule {}
