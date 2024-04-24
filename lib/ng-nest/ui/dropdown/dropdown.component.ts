import {
  Component,
  ViewEncapsulation,
  ElementRef,
  ChangeDetectionStrategy,
  ViewContainerRef,
  ViewChild,
  inject,
  OnDestroy,
  OnInit,
  signal,
  computed
} from '@angular/core';
import { XDropdownPrefix, XDropdownNode, XDropdownProperty } from './dropdown.property';
import { XIsEmpty, XGetChildren, XPositionTopBottom, XNumber } from '@ng-nest/ui/core';
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
export class XDropdownComponent extends XDropdownProperty implements OnInit, OnDestroy {
  private unSubject = new Subject<void>();
  private portalService = inject(XPortalService);
  private viewContainerRef = inject(ViewContainerRef);
  private overlay = inject(Overlay);
  @ViewChild('dropdown', { static: true }) dropdown!: ElementRef<HTMLElement>;
  nodes = computed(() => {
    const data = this.data();
    if (!this.children()) {
      return data.filter((y) => XIsEmpty(y.pid)).map((y) => XGetChildren<XDropdownNode>(data, y, 0));
    }
    return data;
  });
  portal!: XPortalOverlayRef<XDropdownPortalComponent>;
  timeoutHide: any;
  visible = signal(false);
  animating = false;
  outsideClick = false;
  minWidth = signal<XNumber>(0);
  hoverDelayUnsub = new Subject<void>();
  positionChange: Subject<any> = new Subject();
  closeSubject: Subject<void> = new Subject();
  activatedIdSub = new Subject<any>();

  ngOnInit() {
    this.setSubject();
  }

  ngOnDestroy(): void {
    this.unSubject.next();
    this.unSubject.complete();
    this.hoverDelayUnsub.next();
    this.hoverDelayUnsub.complete();
  }

  setSubject() {
    this.closeSubject.pipe(takeUntil(this.unSubject)).subscribe(() => {
      this.closePortal();
    });
    this.activatedIdSub.pipe(takeUntil(this.unSubject)).subscribe((x) => {
      this.activatedId.set(x);
    });
  }

  onEnter() {
    of(true)
      .pipe(delay(this.hoverDelay()), takeUntil(this.hoverDelayUnsub))
      .subscribe(() => {
        if (this.disabled() || this.trigger() === 'click') return;
        if (this.timeoutHide) {
          clearTimeout(this.timeoutHide);
          this.timeoutHide = null;
        }
        if (!this.portal || (this.portal && !this.portal?.overlayRef?.hasAttached())) {
          this.visible.set(true);
          this.createPortal();
        }
      });
  }

  onLeave() {
    this.hoverDelayUnsub.next();
    if (this.disabled() || this.trigger() === 'click') return;
    if (this.portal?.overlayRef?.hasAttached()) {
      this.timeoutHide = setTimeout(() => {
        this.portal?.overlayRef?.dispose();
        this.visible.set(false);
      });
    }
  }

  showPortal() {
    if (this.disabled() || this.trigger() === 'hover' || this.animating) return;
    if (this.trigger() === 'click' && this.portalAttached()) {
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
      this.visible.set(false);
      return true;
    }
    return false;
  }

  destroyPortal() {
    this.portal?.overlayRef?.dispose();
  }

  createPortal() {
    let box = this.dropdown.nativeElement.getBoundingClientRect();
    this.minWidth.set(this.portalMinWidth() ? this.portalMinWidth() : box.width);
    const config: OverlayConfig = {
      backdropClass: '',
      positionStrategy: this.setPlacement(),
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      minWidth: this.minWidth()
    };
    this.setPosition(config);
    this.portal = this.portalService.attach({
      content: XDropdownPortalComponent,
      viewContainerRef: this.viewContainerRef,
      overlayConfig: config
    });
    if (this.trigger() === 'click') {
      this.portal.overlayRef
        ?.outsidePointerEvents()
        .pipe(debounceTime(30), takeUntil(this.unSubject))
        .subscribe(() => {
          this.closeSubject.next();
        });
    }

    this.setInstance();
  }

  setPosition(config: OverlayConfig) {
    let position = config.positionStrategy as FlexibleConnectedPositionStrategy;
    position.positionChanges.pipe(takeUntil(this.unSubject)).subscribe((pos: ConnectedOverlayPositionChange) => {
      const place = XPortalConnectedPosition.get(pos.connectionPair) as XPositionTopBottom;
      place !== this.placement() && this.positionChange.next(place);
    });
  }

  setInstance() {
    let componentRef = this.portal?.componentRef;
    if (!componentRef) return;
    Object.assign(componentRef.instance, {
      data: this.nodes(),
      trigger: this.trigger(),
      minWidth: this.minWidth(),
      maxWidth: this.portalMaxWidth(),
      minHeight: this.portalMinHeight(),
      maxHeight: this.portalMaxHeight(),
      activatedId: this.activatedId(),
      activatedIdSub: this.activatedIdSub,
      size: this.size(),
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
      placement: [this.placement(), 'bottom-start', 'top-start', 'bottom-end', 'top-end'],
      transformOriginOn: 'x-dropdown-portal'
    });
  }
}
