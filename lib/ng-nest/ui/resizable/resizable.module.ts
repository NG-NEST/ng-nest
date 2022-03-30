import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XResizableDirective } from './resizable.directive';

@NgModule({
  declarations: [XResizableDirective],
  exports: [XResizableDirective],
  imports: [CommonModule]
})
export class XResizableModule {}
