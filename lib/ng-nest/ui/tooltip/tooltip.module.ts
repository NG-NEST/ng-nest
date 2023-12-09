import { NgModule } from '@angular/core';
import { XTooltipDirective } from './tooltip.directive';

@NgModule({
  exports: [XTooltipDirective],
  imports: [XTooltipDirective]
})
export class XTooltipModule {}
