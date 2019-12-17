import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { XTooltipComponent } from "./tooltip.component";
import { XTooltipPortalComponent } from "./tooltip-portal.component";
import { XPortalModule } from "@ng-nest/ui/portal";

@NgModule({
  declarations: [XTooltipComponent, XTooltipPortalComponent],
  exports: [XTooltipComponent, XTooltipPortalComponent],
  entryComponents: [XTooltipPortalComponent],
  imports: [CommonModule, XPortalModule]
})
export class XTooltipModule {}
