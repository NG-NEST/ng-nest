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
  Input,
  HostBinding,
  ViewChild,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { XLoadingPrefix } from './loading.type';
import { XClassMap, XInputBoolean, XSize, XTemplate, XIsChange } from '@ng-nest/ui/core';
import { XPortalService, XPortalOverlayRef } from '@ng-nest/ui/portal';

@Component({
  selector: `${XLoadingPrefix},[${XLoadingPrefix}]`,
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XLoadingComponent implements OnInit, OnChanges {
  @Input('x-loading') @XInputBoolean() loading: boolean = false;
  @Input('size') size: XSize;
  @Input('text') text: XTemplate;
  @Input('icon') icon: string;
  @Input('color') color: string;
  @Input('full-screen') @XInputBoolean() fullScreen: boolean;
  @Input() background: string;
  @HostBinding('class.x-loading-parent') get getLoading() {
    return this.loading;
  }
  @ViewChild('loadingTpl', { static: true }) loadingTpl: TemplateRef<void>;
  classMap: XClassMap = {};
  portalRef: XPortalOverlayRef;

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    public portal: XPortalService,
    public viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this.setClassMap();
  }

  ngOnChanges(changes: SimpleChanges) {
    XIsChange(changes.loading) && this.setLoading();
  }

  setClassMap() {
    this.classMap[`${XLoadingPrefix}-${this.size}`] = this.size ? true : false;
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
    this.portalRef = this.portal.create({
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
    if (this.portalRef && this.portalRef.overlayRef.hasAttached()) {
      this.portalRef.overlayRef.detach();
    }
  }
}
