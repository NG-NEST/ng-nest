import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XInnerComponent } from './inner.component';
import { XInnerProperty } from './inner.property';

@NgModule({
  declarations: [XInnerComponent, XInnerProperty],
  exports: [XInnerComponent],
  imports: [CommonModule]
})
export class XInnerModule {}
