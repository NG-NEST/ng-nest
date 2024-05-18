import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  TemplateRef,
  ViewContainerRef,
  HostBinding,
  inject,
  OnDestroy,
  computed,
  signal,
  AfterViewInit,
  viewChild
} from '@angular/core';
import { XDrawerPrefix, XDrawerProperty, X_DRAWER_CONTAINER } from './drawer.property';
import { XIsEmpty, XOpacityAnimation, XSlideAnimation } from '@ng-nest/ui/core';
import { XPortalService, XPortalOverlayRef } from '@ng-nest/ui/portal';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Overlay } from '@angular/cdk/overlay';
import { XDrawerContainerComponent } from './drawer-container.component';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XButtonComponent } from '@ng-nest/ui/button';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: `${XDrawerPrefix}`,
  standalone: true,
  imports: [NgClass, NgTemplateOutlet, XOutletDirective, XButtonComponent],
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XSlideAnimation, XOpacityAnimation]
})
export class XDrawerComponent extends XDrawerProperty implements AfterViewInit, OnDestroy {
  @HostBinding('class.x-drawer-visible') get getVisible() {
    return this.visible();
  }
  drawerTpl = viewChild.required<TemplateRef<void>>('drawerTpl');
  portal!: XPortalOverlayRef<any>;
  back$: Subscription | null = null;
  width = computed(() => {
    return ['left', 'right'].includes(this.placement()) ? this.size() : '100%';
  });
  height = computed(() => {
    return ['top', 'bottom'].includes(this.placement()) ? this.size() : '100%';
  });

  private overlay = inject(Overlay);
  private portalService = inject(XPortalService);
  private viewContainerRef = inject(ViewContainerRef);
  private unSubject = new Subject<void>();
  container = inject<XDrawerContainerComponent>(X_DRAWER_CONTAINER, { optional: true });
  hasContainer = signal(false);
  classMap = computed(() => ({
    [`${XDrawerPrefix}-${this.placement()}`]: !XIsEmpty(this.placement()),
    [`${XDrawerPrefix}-no-title`]: XIsEmpty(this.title())
  }));
  visibleChanged = toObservable(this.visible);

  constructor() {
    super();
    this.visibleChanged.pipe(takeUntil(this.unSubject)).subscribe(() => this.setVisible());
  }

  ngAfterViewInit(): void {
    this.hasContainer.set(!!this.container);
  }

  ngOnDestroy(): void {
    this.back$?.unsubscribe();
  }

  setVisible() {
    if (this.visible()) {
      this.createPortal();
    } else {
      this.closePortal();
    }
  }

  createPortal() {
    if (this.hasContainer()) return;
    this.portal = this.portalService.attach({
      content: this.drawerTpl(),
      viewContainerRef: this.viewContainerRef,
      overlayConfig: {
        hasBackdrop: this.hasBackdrop(),
        scrollStrategy: this.overlay.scrollStrategies.block(),
        positionStrategy: this.portalService.setPosition(this.placement(), this.width(), this.height())
      }
    });
    if (this.portal.overlayRef && this.backdropClose()) {
      this.back$ = this.portal.overlayRef.backdropClick().subscribe(() => this.closePortal());
    }
  }

  portalAttached() {
    return this.portal?.overlayRef?.hasAttached();
  }

  closePortal() {
    if (this.container) {
      this.close.emit();
    } else {
      if (this.portalAttached()) {
        this.portal?.overlayRef?.detach();
        this.back$?.unsubscribe();
        this.close.emit();
      }
    }
  }
}
