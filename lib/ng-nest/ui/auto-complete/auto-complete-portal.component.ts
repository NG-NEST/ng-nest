import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  Renderer2,
  HostBinding,
  HostListener,
  ViewChild,
  TemplateRef
} from '@angular/core';
import { XAutoCompleteNode, XAutoCompletePortalPrefix } from './auto-complete.property';
import { Subject } from 'rxjs';
import { XConnectBaseAnimation, XNumber, XPositionTopBottom } from '@ng-nest/ui/core';
import { takeUntil } from 'rxjs/operators';
import { XListComponent } from '@ng-nest/ui/list';

@Component({
  selector: `${XAutoCompletePortalPrefix}`,
  templateUrl: './auto-complete-portal.component.html',
  styleUrls: ['./auto-complete-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XConnectBaseAnimation]
})
export class XAutoCompletePortalComponent implements OnInit, OnDestroy {
  @HostBinding('@x-connect-base-animation') public placement: XPositionTopBottom;
  @HostListener('@x-connect-base-animation.done', ['$event']) done(event: { toState: any }) {
    this.animating(false);
    event.toState === 'void' && this.destroyPortal();
  }
  @HostListener('@x-connect-base-animation.start', ['$event']) start(event: { toState: any }) {
    this.animating(true);
  }
  @ViewChild('list') list: XListComponent;

  data: XAutoCompleteNode[];
  value: any;
  valueChange: Subject<any>;
  positionChange: Subject<any>;
  dataChange: Subject<XAutoCompleteNode[]>;
  animating: Function;
  destroyPortal: Function;
  closeSubject: Subject<void>;
  keydownSubject: Subject<KeyboardEvent>;
  nodeEmit: Function;
  multiple: XNumber = 1;
  nodeTpl: TemplateRef<any>;
  show: boolean = false;
  active: number = -1;
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
    this.dataChange.pipe(takeUntil(this._unSubject)).subscribe((x) => {
      this.data = x;
      this.cdr.detectChanges();
    });
    this.closeSubject.pipe(takeUntil(this._unSubject)).subscribe((x) => {
      this.list.setUnActive(this.active);
    });
    this.keydownSubject.pipe(takeUntil(this._unSubject)).subscribe((x) => {
      this.list.keydown(x);
    });
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  nodeClick(node: XAutoCompleteNode) {
    this.nodeEmit(node);
  }

  onActive(num: number) {
    this.active = num;
  }

  onTabOut() {
    this.closeSubject.next();
  }
}
