import { Component, ViewEncapsulation, ChangeDetectorRef, ChangeDetectionStrategy, inject } from '@angular/core';
import { XMoveAnimation, XIsEmpty } from '@ng-nest/ui/core';
import { XNotificationPrefix, XNotificationOption, XNotificationRef } from './notification.property';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { XAlertComponent } from '@ng-nest/ui/alert';

@Component({
  selector: `${XNotificationPrefix}`,
  standalone: true,
  imports: [XAlertComponent],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XMoveAnimation]
})
export class XNotificationComponent {
  notification: XNotificationRef = { list: [] };

  cdr = inject(ChangeDetectorRef);

  onClose(item: XNotificationOption) {
    this.notification.list?.splice(this.notification.list.indexOf(item), 1);
    item.duration$ && item.duration$.unsubscribe();
    this.cdr.detectChanges();
  }

  moveDone($event: { toState: string }) {
    if ($event.toState === 'void' && XIsEmpty(this.notification.list)) {
      this.notification.ref?.overlayRef?.detach();
    }
  }

  onEnter(item: XNotificationOption) {
    item.duration$ && item.duration$.unsubscribe();
  }

  onLeave(item: XNotificationOption) {
    if (item.duration) {
      item.duration$ = of(true)
        .pipe(delay(item.duration))
        .subscribe(() => {
          this.onClose(item);
        });
    }
  }
}
