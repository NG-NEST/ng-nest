import { Component, ViewEncapsulation, ChangeDetectorRef, ChangeDetectionStrategy, inject } from '@angular/core';
import { XMoveAnimation, XIsEmpty } from '@ng-nest/ui/core';
import { XMessagePrefix, XMessageOption, XMessagePlacementRef } from './message.property';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { XAlertComponent } from '@ng-nest/ui/alert';

@Component({
  selector: `${XMessagePrefix}`,
  imports: [XAlertComponent],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XMoveAnimation]
})
export class XMessageComponent {
  message: XMessagePlacementRef = { ref: {}, list: [], closeAll: () => {} };
  cdr = inject(ChangeDetectorRef);

  onClose(item: XMessageOption) {
    this.message.list?.splice(this.message.list.indexOf(item), 1);
    item.durationSubscription?.unsubscribe();
    this.cdr.detectChanges();
  }

  moveDone($event: { toState: string }) {
    if ($event.toState === 'void' && XIsEmpty(this.message.list)) {
      this.message.ref?.overlayRef?.detach();
    }
  }

  onEnter(item: XMessageOption) {
    item.durationSubscription?.unsubscribe();
  }

  onLeave(item: XMessageOption) {
    if (item.duration) {
      item.durationSubscription = of(true)
        .pipe(delay(item.duration))
        .subscribe(() => this.onClose(item));
    }
  }
}
