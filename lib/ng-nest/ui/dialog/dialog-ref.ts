import { OverlayRef } from '@angular/cdk/overlay';
import { filter, take } from 'rxjs';
import { XDialogContainerComponent } from './dialog-container.component';

// TODO: add more function
export class XDialogRef<C> {
  componentInstance!: C;
  constructor(public overlayRef: OverlayRef, public containerInstance: XDialogContainerComponent) {}
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
