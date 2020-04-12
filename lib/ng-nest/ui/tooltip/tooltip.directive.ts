import { ElementRef, ViewContainerRef, Directive, HostListener, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { XPortalService, XPortalOverlayRef } from '@ng-nest/ui/portal';
import { XTooltipPortalComponent } from './tooltip-portal.component';
import { XTooltipPrefix, XTooltipProperty } from './tooltip.property';
import { BehaviorSubject } from 'rxjs';
import { XIsChange } from '@ng-nest/ui/core';

@Directive({
  selector: `[${XTooltipPrefix}], ${XTooltipPrefix}`
})
export class XTooltipDirective extends XTooltipProperty implements OnChanges, OnDestroy {
  portal: XPortalOverlayRef<XTooltipPortalComponent>;
  box: DOMRect;
  contentChange: BehaviorSubject<any> = new BehaviorSubject(null);
  timeoutHide: any;

  constructor(private elementRef: ElementRef, private portalService: XPortalService, private viewContainerRef: ViewContainerRef) {
    super();
  }

  @HostListener('mouseenter') mouseenter() {
    this.show();
  }

  @HostListener('mouseleave') mouseleave() {
    this.hide();
  }

  ngOnChanges(changes: SimpleChanges): void {
    XIsChange(changes.content) && this.contentChange.next(this.content);
  }

  ngOnDestroy(): void {
    this.contentChange.complete();
  }

  show() {
    if (this.timeoutHide) clearTimeout(this.timeoutHide);
    if (!this.portal || (this.portal && !this.portal.overlayRef?.hasAttached())) {
      this.visible = true;
      this.createPortal();
    }
  }

  hide() {
    if (this.portal?.overlayRef?.hasAttached()) {
      this.timeoutHide = setTimeout(() => {
        this.visible = false;
        this.portal.overlayRef?.dispose();
      });
    }
  }

  createPortal() {
    this.portal = this.portalService.attach({
      content: XTooltipPortalComponent,
      viewContainerRef: this.viewContainerRef,
      overlayConfig: {
        backdropClass: '',
        positionStrategy: this.portalService.setPlacement(
          this.elementRef,
          this.placement,
          'bottom-start',
          'bottom',
          'bottom-end',
          'top-start',
          'top',
          'top-end',
          'left-start',
          'left',
          'left-end',
          'right-start',
          'right',
          'right-end'
        )
      }
    });
    this.setInstance();
  }

  setInstance() {
    let componentRef = this.portal?.componentRef;
    if (!componentRef) return;
    this.box = this.elementRef.nativeElement.getBoundingClientRect();
    Object.assign(componentRef.instance, {
      box: this.box,
      content: this.content,
      contentChange: this.contentChange,
      placement: this.placement,
      portalHover: (hover: boolean) => {
        if (this.timeoutHide && hover) {
          clearTimeout(this.timeoutHide);
        } else {
          this.hide();
        }
      },
      viewInit: () => this.updatePortal()
    });
    componentRef.changeDetectorRef.detectChanges();
  }

  updatePortal() {
    this.portal.overlayRef?.updatePosition();
  }
}
