import { NgModule } from '@angular/core';
import { XResizableDirective } from './resizable.directive';

@NgModule({
  imports: [XResizableDirective],
  exports: [XResizableDirective]
})
export class XResizableModule {}
