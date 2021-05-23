import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XTooltipDirective } from './tooltip.directive';
import { XTooltipPortalComponent } from './tooltip-portal.component';
import { XPortalModule } from '@ng-nest/ui/portal';
import { XTooltipProperty } from './tooltip.property';

@NgModule({
  declarations: [XTooltipDirective, XTooltipPortalComponent, XTooltipProperty],
  exports: [XTooltipDirective, XTooltipPortalComponent],
  imports: [CommonModule, XPortalModule],
  entryComponents: [XTooltipPortalComponent]
})
export class XTooltipModule {}
