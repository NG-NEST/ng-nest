import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { XPortalComponent } from "./portal.component";
import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import { XPortalServiceModule } from "./portal.service.module";

@NgModule({
  declarations: [XPortalComponent],
  exports: [XPortalComponent],
  imports: [CommonModule, OverlayModule, PortalModule, XPortalServiceModule]
})
export class XPortalModule {}
