import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { XPortalService } from './portal.service';

@NgModule({
  imports: [OverlayModule, PortalModule],
  exports: [OverlayModule, PortalModule],
  providers: [XPortalService]
})
export class XPortalModule {}
