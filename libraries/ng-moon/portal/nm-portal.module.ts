import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NmPortalComponent } from "./nm-portal.component";
import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import { NmPortalServiceModule } from "./nm-portal.service.module";

@NgModule({
  declarations: [NmPortalComponent],
  exports: [NmPortalComponent],
  imports: [CommonModule, OverlayModule, PortalModule, NmPortalServiceModule]
})
export class NmPortalModule {}
