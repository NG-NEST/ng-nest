import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XTooltipDirective } from './tooltip.directive';
import { XTooltipPortalComponent } from './tooltip-portal.component';
import { XTooltipProperty } from './tooltip.property';
import { XOutletDirective } from '@ng-nest/ui/outlet';

@NgModule({
  declarations: [XTooltipDirective, XTooltipPortalComponent, XTooltipProperty],
  exports: [XTooltipDirective, XTooltipPortalComponent],
  imports: [CommonModule, XOutletDirective]
})
export class XTooltipModule {}
