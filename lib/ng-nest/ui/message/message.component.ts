import { Component, ViewEncapsulation, Renderer2, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { XMoveAnimation, XIsEmpty } from '@ng-nest/ui/core';
import { XMessagePrefix, XMessageOption, XMessageRef } from './message.property';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: `${XMessagePrefix}`,
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XMoveAnimation]
})
export class XMessageComponent {
  message: XMessageRef = { ref: {}, list: [], currentClose: () => {}, closeAll: () => {} };

  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {}

  onClose(item: XMessageOption) {
    this.message.list?.splice(this.message.list.indexOf(item), 1);
    item.duration$?.unsubscribe();
    this.cdr.detectChanges();
  }

  moveDone($event: { toState: string }) {
    if ($event.toState === 'void' && XIsEmpty(this.message.list)) {
      this.message.ref?.overlayRef?.detach();
    }
  }

  onEnter(item: XMessageOption) {
    item.duration$?.unsubscribe();
  }

  onLeave(item: XMessageOption) {
    if (item.duration) {
      item.duration$ = of(true)
        .pipe(delay(item.duration))
        .subscribe(() => this.onClose(item));
    }
  }

  trackByNode(_index: number, item: XMessageOption) {
    return `${item.title}-${item.content}`;
  }
}
