import { NgModule } from '@angular/core';
import { XPopoverDirective } from './popover.directive';

@NgModule({
  exports: [XPopoverDirective],
  imports: [XPopoverDirective]
})
export class XPopoverModule {}
