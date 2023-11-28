import { NgModule } from '@angular/core';
import { XDragDirective } from './drag.directive';

@NgModule({
  exports: [XDragDirective],
  imports: [XDragDirective]
})
export class XDragModule {}
