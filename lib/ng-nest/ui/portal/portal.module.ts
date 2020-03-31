import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
  imports: [OverlayModule, PortalModule],
  exports: [OverlayModule, PortalModule]
})
export class XPortalModule {}
