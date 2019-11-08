import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NuPortalComponent } from "./nu-portal.component";
import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import { NuPortalServiceModule } from "./nu-portal.service.module";

@NgModule({
  declarations: [NuPortalComponent],
  exports: [NuPortalComponent],
  imports: [CommonModule, OverlayModule, PortalModule, NuPortalServiceModule]
})
export class NuPortalModule {}
