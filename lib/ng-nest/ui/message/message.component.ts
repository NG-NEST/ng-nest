import {
  Component,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { XMoveAnimation, XIsEmpty } from '@ng-nest/ui/core';
import { XMessagePrefix, XMessageInput, XMessageRef } from './message.type';
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
  message: XMessageRef = { list: [] };

  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {}

  onClose(item: XMessageInput) {
    this.message.list.splice(this.message.list.indexOf(item), 1);
    item.duration$ && item.duration$.unsubscribe();
    this.cdr.detectChanges();
  }

  moveDone() {
    if (XIsEmpty(this.message.list)) {
      this.message.ref.overlayRef.dispose();
    }
  }

  onEnter(item: XMessageInput) {
    item.duration$ && item.duration$.unsubscribe();
  }

  onLeave(item: XMessageInput) {
    if (item.duration) {
      item.duration$ = of(true)
        .pipe(delay(item.duration))
        .subscribe(() => this.onClose(item));
    }
  }
}
