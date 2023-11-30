import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
  HostBinding,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
  inject
} from '@angular/core';
import { XLoadingPrefix, XLoadingProperty } from './loading.property';
import { XIsChange, XIsEmpty, XConfigService, XIsNumber, XClearClass } from '@ng-nest/ui/core';
import { XPortalService, XPortalOverlayRef } from '@ng-nest/ui/portal';
import { CommonModule } from '@angular/common';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XOutletDirective } from '@ng-nest/ui/outlet';

@Component({
  selector: `${XLoadingPrefix}, [${XLoadingPrefix}]`,
  standalone: true,
  imports: [CommonModule, XIconComponent, XOutletDirective],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XLoadingComponent extends XLoadingProperty implements OnInit, OnChanges {
  @HostBinding('class.x-loading-parent') get getLoading() {
    return this.loading;
  }
  @ViewChild('loadingTpl') loadingTpl!: TemplateRef<void>;
  portalRef!: XPortalOverlayRef<any>;

  sizeNumber?: number;

  private cdr = inject(ChangeDetectorRef);
  private portal = inject(XPortalService);
  private viewContainerRef = inject(ViewContainerRef);
  configService = inject(XConfigService);

  ngOnInit() {
    this.setClassMap();
  }

  ngOnChanges(changes: SimpleChanges) {
    const { loading, size } = changes;
    XIsChange(loading) && this.setLoading();
    XIsChange(size) && this.setClassMap();
  }

  setClassMap() {
    XClearClass(this.classMap);
    if (XIsNumber(this.size)) {
      this.sizeNumber = this.size as number;
    } else {
      this.classMap[`${XLoadingPrefix}-${this.size}`] = !XIsEmpty(this.size);
    }
    this.cdr.markForCheck();
  }

  setLoading() {
    if (this.fullScreen) {
      if (this.loading) {
        this.createFullScreen();
      } else {
        this.closeFullScreen();
      }
    }
    this.cdr.detectChanges();
  }

  createFullScreen() {
    this.portalRef = this.portal.attach({
      content: this.loadingTpl,
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
