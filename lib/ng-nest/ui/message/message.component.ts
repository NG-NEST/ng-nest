import { Component, ViewEncapsulation, ChangeDetectorRef, ChangeDetectionStrategy, inject } from '@angular/core';
import { XIsEmpty } from '@ng-nest/ui/core';
import { XMessagePrefix, XMessageOption, XMessagePlacementRef, XMessageHandle } from './message.property';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { XAlertComponent } from '@ng-nest/ui/alert';

@Component({
  selector: `${XMessagePrefix}`,
  imports: [XAlertComponent],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XMessageComponent implements XMessageHandle {
  message: XMessagePlacementRef = { ref: {}, list: [], closeAll: () => {} };
  cdr = inject(ChangeDetectorRef);

  onClose(item: XMessageOption) {
    this.message.list?.splice(this.message.list.indexOf(item), 1);
    item.durationSubscription?.unsubscribe();
    this.cdr.detectChanges();
  }
  moveDone($event: AnimationEvent) {
    if ($event.animationName.endsWith('-leave') && XIsEmpty(this.message.list)) {
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
