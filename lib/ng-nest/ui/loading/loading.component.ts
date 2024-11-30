import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  HostBinding,
  TemplateRef,
  ViewContainerRef,
  inject,
  computed,
  effect,
  viewChild
} from '@angular/core';
import { XLoadingPrefix, XLoadingProperty } from './loading.property';
import { XIsEmpty, XIsNumber, XCorner, XToNumber } from '@ng-nest/ui/core';
import { XPortalService, XPortalOverlayRef } from '@ng-nest/ui/portal';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { NgClass, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: `${XLoadingPrefix}, [${XLoadingPrefix}]`,
  imports: [NgClass, NgTemplateOutlet, XIconComponent, XOutletDirective],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XLoadingComponent extends XLoadingProperty {
  @HostBinding('class.x-loading-parent') get getLoading() {
    return this.loading();
  }
  loadingTpl = viewChild.required<TemplateRef<void>>('loadingTpl');
  portalRef!: XPortalOverlayRef<any>;

  isRadius = computed(() => !(this.radius() instanceof Array) && Boolean(this.radius()));

  sizeNumber = computed(() => {
    const size = XToNumber(this.size());
    if (XIsNumber(size)) {
      return size;
    }
    return;
  });

  classMap = computed(() => {
    const size = this.size();
    if (isNaN(XToNumber(size))) {
      return { [`${XLoadingPrefix}-${size}`]: !XIsEmpty(size) };
    }
    return;
  });

  private portal = inject(XPortalService);
  private viewContainerRef = inject(ViewContainerRef);

  constructor() {
    super();
    effect(() => {
      if (this.fullScreen()) {
        if (this.loading()) {
          this.createFullScreen();
        } else {
          this.closeFullScreen();
        }
      }
    });
  }

  includeRadius(cover: XCorner) {
    const radius = this.radius();
    if (!(radius instanceof Array)) {
      return false;
    }
    return radius.includes(cover);
  }

  createFullScreen() {
    this.portalRef = this.portal.attach({
      content: this.loadingTpl(),
      viewContainerRef: this.viewContainerRef,
      overlayConfig: {
        width: '100%',
        height: '100%',
        positionStrategy: this.portal.setPlacement()
      }
    });
  }

  closeFullScreen() {
    if (this.portalRef?.overlayRef?.hasAttached()) {
      this.portalRef.overlayRef.detach();
    }
  }
}
