import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XColorComponent } from './color.component';
import { XColorProperty } from './color.property';

@NgModule({
  declarations: [XColorComponent, XColorProperty],
  exports: [XColorComponent],
  imports: [CommonModule]
})
export class XColorModule {}
