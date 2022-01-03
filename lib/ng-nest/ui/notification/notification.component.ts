import { Component, ViewEncapsulation, Renderer2, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { XMoveAnimation, XIsEmpty } from '@ng-nest/ui/core';
import { XNotificationPrefix, XNotificationOption, XNotificationRef } from './notification.property';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: `${XNotificationPrefix}`,
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XMoveAnimation]
})
export class XNotificationComponent {
  notification: XNotificationRef = { list: [] };

  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {}

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

  trackByItem(_index: number, item: XNotificationOption) {
    return `${item.title}-${item.content}`;
  }
}
