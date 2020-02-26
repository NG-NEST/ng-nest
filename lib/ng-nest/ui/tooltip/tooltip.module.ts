import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { XTooltipDirective } from "./tooltip.directive";
import { XTooltipPortalComponent } from "./tooltip-portal.component";
import { XPortalModule } from "@ng-nest/ui/portal";

@NgModule({
  declarations: [XTooltipDirective, XTooltipPortalComponent],
  exports: [XTooltipDirective, XTooltipPortalComponent],
  entryComponents: [XTooltipPortalComponent],
  imports: [CommonModule, XPortalModule]
})
export class XTooltipModule {}
