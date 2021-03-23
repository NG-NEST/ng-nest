import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  Renderer2,
  HostBinding,
  HostListener
} from '@angular/core';
import { XSelectNode, XSelectPortalPrefix } from './select.property';
import { Subject } from 'rxjs';
import { XBoolean, XConnectBaseAnimation, XNumber, XPositionTopBottom } from '@ng-nest/ui/core';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: `${XSelectPortalPrefix}`,
  templateUrl: './select-portal.component.html',
  styleUrls: ['./select-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XConnectBaseAnimation]
})
export class XSelectPortalComponent implements OnInit, OnDestroy {
  @HostBinding('@x-connect-base-animation') public placement: XPositionTopBottom;
  @HostListener('@x-connect-base-animation.done', ['$event']) done(event: { toState: any }) {
    event.toState === 'void' && this.destroyPortal();
  }

  data: XSelectNode[];
  value: any;
  valueChange: Subject<any>;
  positionChange: Subject<any>;
  closePortal: Function;
  destroyPortal: Function;
  nodeEmit: Function;
  multiple: XNumber = 1;
  show: boolean = false;
  private _unSubject = new Subject<void>();

  constructor(public renderer: Renderer2, public cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.valueChange.pipe(takeUntil(this._unSubject)).subscribe((x) => {
      this.value = x;
      this.cdr.detectChanges();
    });
    this.positionChange.pipe(takeUntil(this._unSubject)).subscribe((x) => {
      this.placement = x;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  nodeClick(node: XSelectNode) {
    if (this.multiple === 0) this.nodeEmit(this.value);
    else this.nodeEmit(node);
  }
}
