import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
  HostBinding,
  ViewChild,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { XLoadingPrefix, XLoadingProperty } from './loading.property';
import { XIsChange, XIsEmpty } from '@ng-nest/ui/core';
import { XPortalService, XPortalOverlayRef } from '@ng-nest/ui/portal';

@Component({
  selector: `${XLoadingPrefix}, [${XLoadingPrefix}]`,
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XLoadingComponent extends XLoadingProperty implements OnInit, OnChanges {
  @HostBinding('class.x-loading-parent') get getLoading() {
    return this.loading;
  }
  @ViewChild('loadingTpl', { static: true }) loadingTpl: TemplateRef<void>;
  portalRef: XPortalOverlayRef<any>;

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    public portal: XPortalService,
    public viewContainerRef: ViewContainerRef
  ) {
    super();
  }

  ngOnInit() {
    this.setClassMap();
  }

  ngOnChanges(changes: SimpleChanges) {
    XIsChange(changes.loading) && this.setLoading();
  }

  setClassMap() {
    this.classMap[`${XLoadingPrefix}-${this.size}`] = !XIsEmpty(this.size);
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
