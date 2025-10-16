import { OverlayRef } from '@angular/cdk/overlay';
import { XDrawerPortalComponent } from './drawer-portal.component';

// TODO: add more function
export class XDrawerRef<C> {
  componentInstance!: C;
  constructor(
    public overlayRef: OverlayRef,
    public containerInstance: XDrawerPortalComponent
  ) {}
  close() {
    this.overlayRef.detach();
  }
}
