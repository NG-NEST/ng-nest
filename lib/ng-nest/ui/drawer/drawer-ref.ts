import { OverlayRef } from '@angular/cdk/overlay';
import { filter, take } from 'rxjs';
import { XDrawerPortalComponent } from './drawer-portal.component';

// TODO: add more function
export class XDrawerRef<C> {
  componentInstance!: C;
  constructor(public overlayRef: OverlayRef, public containerInstance: XDrawerPortalComponent) {}
  close() {
    this.containerInstance.animationChanged
      .pipe(
        filter((event) => event.state === 'void' && event.action === 'done'),
        take(1)
      )
      .subscribe(() => {
        this.overlayRef.detach();
      });
    this.containerInstance.placement = 'void';
  }
}
