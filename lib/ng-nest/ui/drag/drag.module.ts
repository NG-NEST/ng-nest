import { NgModule } from '@angular/core';
import { XDragDirective } from './drag.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [XDragDirective],
  exports: [XDragDirective],
  imports: [CommonModule]
})
export class XDragModule {}
