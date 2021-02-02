import { XListNode } from '@ng-nest/ui/list';
import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  Renderer2,
  OnDestroy,
  ViewChild,
  ElementRef,
  HostBinding,
  HostListener
} from '@angular/core';
import { XTimePickerPortalPrefix, XTimePickerType } from './time-picker.property';
import { XIsEmpty, reqAnimFrame, XConnectAnimation, XCorner } from '@ng-nest/ui/core';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: `${XTimePickerPortalPrefix}`,
  templateUrl: './time-picker-portal.component.html',
  styleUrls: ['./time-picker-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XConnectAnimation]
})
export class XTimePickerPortalComponent implements OnInit, OnDestroy {
  @HostBinding('@x-connect-animation') public placement: XCorner;
  @HostListener('@x-connect-animation.done', ['$event']) done(event: { toState: any }) {
    event.toState === 'void' && this.destroyPortal();
  }
  type: XTimePickerType = 'time';
  value: any;
  valueChange: Subject<any>;
  positionChange: Subject<any>;
  closePortal: Function;
  destroyPortal: Function;
  nodeEmit: (date: Date) => void;

  docClickFunction: Function;
  private _unSubject = new Subject<void>();

  constructor(public renderer: Renderer2, public cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.valueChange.pipe(takeUntil(this._unSubject)).subscribe((x: any) => {
      this.value = x;
    });
    this.positionChange.pipe(takeUntil(this._unSubject)).subscribe((x) => {
      this.placement = x;
      this.cdr.detectChanges();
    });
    setTimeout(
      () =>
        (this.docClickFunction = this.renderer.listen('document', 'click', () => {
          this.closePortal();
        }))
    );
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
    this.docClickFunction && this.docClickFunction();
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}
