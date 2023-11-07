import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XTooltipDirective } from './tooltip.directive';
import { XTooltipPortalComponent } from './tooltip-portal.component';
import { XPortalModule } from '@ng-nest/ui/portal';
import { XTooltipProperty } from './tooltip.property';
import { XOutletModule } from '@ng-nest/ui/outlet';

@NgModule({
  declarations: [XTooltipDirective, XTooltipPortalComponent, XTooltipProperty],
  exports: [XTooltipDirective, XTooltipPortalComponent],
  imports: [CommonModule, XPortalModule, XOutletModule]
})
export class XTooltipModule {}
