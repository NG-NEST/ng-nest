import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  SimpleChanges,
  OnChanges,
  TemplateRef,
  ViewContainerRef,
  EventEmitter,
  Output
} from '@angular/core';
import { XDrawerPrefix } from './drawer.type';
import { XClassMap, XInputBoolean, XPosition, XTemplate, XIsChange, XIsEmpty, XSlideAnimation } from '@ng-nest/ui/core';
import { XPortalService, XPortalOverlayRef } from '@ng-nest/ui/portal';
import { Subscription } from 'rxjs';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: `${XDrawerPrefix}`,
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XSlideAnimation]
})
export class XDrawerComponent implements OnInit, OnChanges {
  @Input() title?: XTemplate;
  @Input() @XInputBoolean() visible?: boolean;
  @Input() placement?: XPosition = 'right';
  @Input() size: string = '30%';
  @Output() close = new EventEmitter();
  @ViewChild('drawerTpl', { static: true }) drawerTpl: TemplateRef<void>;
  classMap: XClassMap = {};
  portal: XPortalOverlayRef;
  back$: Subscription | null = null;

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    public overlay: Overlay,
    public portalService: XPortalService,
    public viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this.setClassMap();
  }

  ngOnChanges(simples: SimpleChanges) {
    XIsChange(simples.visible) && this.setVisible();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  unsubscribe() {
    this.back$ && this.back$.unsubscribe();
  }

  setClassMap() {
    this.classMap[`${XDrawerPrefix}-${this.placement}`] = this.placement ? true : false;
    this.classMap[`${XDrawerPrefix}-no-title`] = XIsEmpty(this.title);
  }

  setVisible() {
    if (this.visible) {
      this.createPortal();
    } else {
      this.closePortal();
    }
  }

  createPortal() {
    const width = this.placement === 'left' || this.placement === 'right' ? this.size : '100%';
    const height = this.placement === 'top' || this.placement === 'bottom' ? this.size : '100%';
    this.portal = this.portalService.create({
      content: this.drawerTpl,
      viewContainerRef: this.viewContainerRef,
      overlayConfig: {
        hasBackdrop: true,
        scrollStrategy: this.overlay.scrollStrategies.noop(),
        positionStrategy: this.portalService.setPosition(this.placement, width, height)
      }
    });
    this.back$ = this.portal.overlayRef.backdropClick().subscribe(() => this.closePortal());
  }

  portalAttached() {
    return this.portal && this.portal.overlayRef.hasAttached();
  }

  closePortal() {
    if (this.portalAttached()) {
      this.portal.overlayRef.detach();
      this.unsubscribe();
      this.close.emit();
      return true;
    }
    return false;
  }
}
