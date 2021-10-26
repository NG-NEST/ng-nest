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
  TemplateRef,
  ViewChild
} from '@angular/core';
import { XSelectNode, XSelectPortalPrefix } from './select.property';
import { Subject } from 'rxjs';
import { XConnectBaseAnimation, XNumber, XPositionTopBottom } from '@ng-nest/ui/core';
import { takeUntil } from 'rxjs/operators';
import { XListComponent } from '@ng-nest/ui/list';
import { XInputComponent } from '@ng-nest/ui/input';

@Component({
  selector: `${XSelectPortalPrefix}`,
  templateUrl: './select-portal.component.html',
  styleUrls: ['./select-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XConnectBaseAnimation]
})
export class XSelectPortalComponent implements OnInit, OnDestroy {
  @HostBinding('@x-connect-base-animation') public placement!: XPositionTopBottom;
  @HostListener('@x-connect-base-animation.done', ['$event']) done(event: { toState: any }) {
    this.animating(false);
    event.toState === 'void' && this.destroyPortal();
  }
  @HostListener('@x-connect-base-animation.start', ['$event']) start(event: { toState: any }) {
    this.animating(true);
  }

  @ViewChild('list') list!: XListComponent;

  data!: XSelectNode[];
  value: any;
  valueChange!: Subject<any>;
  positionChange!: Subject<any>;
  animating!: Function;
  activeChange!: Function;
  destroyPortal!: Function;
  closeSubject!: Subject<void>;
  keydownSubject!: Subject<KeyboardEvent>;
  nodeEmit!: Function;
  multiple: XNumber = 1;
  nodeTpl!: TemplateRef<any>;
  show: boolean = false;
  active: number = -1;
  inputCom!: XInputComponent;
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

  nodeClick(node: XSelectNode) {
    if (this.multiple === 0) this.nodeEmit(this.value);
    else this.nodeEmit(node);
  }

  onActive(num: number) {
    this.active = num;
  }

  onTabOut() {
    this.closeSubject.next();
  }
}
