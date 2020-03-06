import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XColorComponent } from './color.component';

@NgModule({
  declarations: [XColorComponent],
  exports: [XColorComponent],
  imports: [CommonModule]
})
export class XColorModule {}
