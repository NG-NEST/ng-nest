import { OverlayRef } from '@angular/cdk/overlay';
import { ElementRef } from '@angular/core';
import { filter, take } from 'rxjs';
import { XDialogPortalComponent } from './dialog-portal.component';

// TODO: add more function
export class XDialogRef<C> {
  componentInstance!: C;
  dragHandleRefs: ElementRef<HTMLElement>[] = [];
  constructor(public overlayRef: OverlayRef, public containerInstance: XDialogPortalComponent) {}
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
