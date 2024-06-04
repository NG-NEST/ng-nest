import {
  Component,
  ViewEncapsulation,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
  ViewContainerRef,
  ViewChild,
  inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { XDropdownPrefix, XDropdownNode, XDropdownProperty } from './dropdown.property';
import {
  XIsChange,
  XIsEmpty,
  XSetData,
  XGetChildren,
  XConfigService,
  XPositionTopBottom,
  XPlacement
} from '@ng-nest/ui/core';
import { of, Subject } from 'rxjs';
import { XPortalConnectedPosition, XPortalOverlayRef, XPortalService } from '@ng-nest/ui/portal';
import { XDropdownPortalComponent } from './dropdown-portal.component';
import { debounceTime, delay, takeUntil } from 'rxjs/operators';
import {
  ConnectedOverlayPositionChange,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayConfig
} from '@angular/cdk/overlay';
import { NgClass } from '@angular/common';

@Component({
  selector: `${XDropdownPrefix}`,
  standalone: true,
  imports: [NgClass],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XDropdownComponent extends XDropdownProperty implements OnInit, OnChanges, OnDestroy {
  @ViewChild('dropdown', { static: true }) dropdown!: ElementRef<HTMLElement>;
  datas: XDropdownNode[] = [];
  nodes: XDropdownNode[] = [];
  portal!: XPortalOverlayRef<XDropdownPortalComponent>;
  timeoutHide: any;
  visible: boolean = false;
  animating = false;
  outsideClick = false;
  minWidth!: string | number;
  hoverDelayUnsub = new Subject<void>();
  positionChange: Subject<any> = new Subject();
  closeSubject: Subject<void> = new Subject();
  activatedIdSub = new Subject<any>();
  private _unSubject = new Subject<void>();
  private cdr = inject(ChangeDetectorRef);
  private portalService = inject(XPortalService);
  private viewContainerRef = inject(ViewContainerRef);
  private overlay = inject(Overlay);
  configService = inject(XConfigService);

  ngOnInit() {
    this.setSubject();
  }

  ngOnChanges(changes: SimpleChanges) {
    const { data } = changes;
    XIsChange(data) && this.setData();
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.complete();
    this.hoverDelayUnsub.next();
    this.hoverDelayUnsub.complete();
  }

  setSubject() {
    this.closeSubject.pipe(takeUntil(this._unSubject)).subscribe(() => {
      this.closePortal();
    });
    this.activatedIdSub.pipe(takeUntil(this._unSubject)).subscribe((x) => {
      this.activatedId = x;
      this.activatedIdChange.emit(x);
    });
  }

  onEnter() {
    of(true)
      .pipe(delay(this.hoverDelay), takeUntil(this.hoverDelayUnsub))
      .subscribe(() => {
        if (this.disabled || this.trigger === 'click') return;
        if (this.timeoutHide) {
          clearTimeout(this.timeoutHide);
          this.timeoutHide = null;
        }
        if (!this.portal || (this.portal && !this.portal?.overlayRef?.hasAttached())) {
          this.visible = true;
          this.createPortal();
          this.cdr.detectChanges();
        }
      });
  }

  onLeave() {
    this.hoverDelayUnsub.next();
    if (this.disabled || this.trigger === 'click') return;
    if (this.portal?.overlayRef?.hasAttached()) {
      this.timeoutHide = setTimeout(() => {
        this.visible = false;
        this.portal?.overlayRef?.dispose();
        this.cdr.detectChanges();
      });
    }
  }

  showPortal() {
    if (this.disabled || this.trigger === 'hover' || this.animating) return;
    if (this.trigger === 'click' && this.portalAttached()) {
      this.closeSubject.next();
      return;
    }
    this.createPortal();
  }

  portalAttached() {
    return this.portal?.overlayRef?.hasAttached();
  }

  closePortal() {
    if (this.portalAttached()) {
      this.portal?.overlayRef?.dispose();
      this.visible = false;
      return true;
    }
    return false;
  }

  destroyPortal() {
    this.portal?.overlayRef?.dispose();
  }

  createPortal() {
    let box = this.dropdown.nativeElement.getBoundingClientRect();
    this.minWidth = this.portalMinWidth ? this.portalMinWidth : box.width;
    const config: OverlayConfig = {
      backdropClass: '',
      positionStrategy: this.setPlacement(),
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      minWidth: this.minWidth
    };
    this.setPosition(config);
    this.portal = this.portalService.attach({
      content: XDropdownPortalComponent,
      viewContainerRef: this.viewContainerRef,
      overlayConfig: config
    });
    if (this.trigger === 'click') {
      this.portal.overlayRef
        ?.outsidePointerEvents()
        .pipe(debounceTime(30), takeUntil(this._unSubject))
        .subscribe(() => {
          this.closeSubject.next();
        });
    }
    this.setInstance();
  }

  setPosition(config: OverlayConfig) {
    let position = config.positionStrategy as FlexibleConnectedPositionStrategy;
    position.positionChanges.pipe(takeUntil(this._unSubject)).subscribe((pos: ConnectedOverlayPositionChange) => {
      const place = XPortalConnectedPosition.get(pos.connectionPair) as XPositionTopBottom;
      place !== this.placement && this.positionChange.next(place);
    });
  }

  setInstance() {
    let componentRef = this.portal?.componentRef;
    if (!componentRef) return;
    Object.assign(componentRef.instance, {
      data: this.nodes,
      trigger: this.trigger,
      minWidth: this.minWidth,
      maxWidth: this.portalMaxWidth,
      minHeight: this.portalMinHeight,
      maxHeight: this.portalMaxHeight,
      activatedId: this.activatedId,
      activatedIdSub: this.activatedIdSub,
      size: this.size,
      close: () => this.closeSubject.next(),
      positionChange: this.positionChange,
      destroyPortal: () => this.destroyPortal(),
      nodeEmit: (node: XDropdownNode) => this.nodeClick.emit(node),
      portalHover: (hover: boolean) => this.portalHover(hover),
      animating: (ing: boolean) => (this.animating = ing)
    });
    componentRef.changeDetectorRef.detectChanges();
  }

  portalHover(hover: boolean) {
    if (this.timeoutHide && hover) {
      clearTimeout(this.timeoutHide);
    } else {
      this.onLeave();
    }
  }

  setPlacement() {
    return this.portalService.setPlacement({
      elementRef: this.dropdown,
      placement: [this.placement as XPlacement, 'bottom-start', 'top-start', 'bottom-end', 'top-end'],
      transformOriginOn: 'x-dropdown-portal'
    });
  }

  private setData() {
    XSetData<XDropdownNode>(this.data, this._unSubject).subscribe((x) => {
      this.datas = x;
      if (!this.children) {
        this.nodes = x.filter((y) => XIsEmpty(y.pid)).map((y) => XGetChildren<XDropdownNode>(x, y, 0));
      } else {
        this.nodes = x;
      }
      this.cdr.detectChanges();
    });
  }
}
