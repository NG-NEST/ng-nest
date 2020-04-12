import { OnInit, ElementRef, ViewContainerRef, Directive, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { XPortalService, XPortalOverlayRef } from '@ng-nest/ui/portal';
import { XPopoverPortalComponent } from './popover-portal.component';
import { XPopoverPrefix, XPopoverProperty } from './popover.property';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: `[${XPopoverPrefix}], ${XPopoverPrefix}`
})
export class XPopoverDirective extends XPopoverProperty implements OnInit, OnChanges {
  portal: XPortalOverlayRef<XPopoverPortalComponent>;
  box: DOMRect;
  contentChange: BehaviorSubject<any> = new BehaviorSubject(null);
  timeoutHide: any;

  constructor(private elementRef: ElementRef, private portalService: XPortalService, private viewContainerRef: ViewContainerRef) {
    super();
  }

  @HostListener('click') click() {
    if (this.trigger === 'click') {
      this.visible = !this.visible;
      if (this.visible) this.show();
      else this.hide();
      this.visibleChange.emit(this.visible);
    }
  }

  @HostListener('mouseenter') mouseenter() {
    if (this.trigger === 'hover') this.show();
  }

  @HostListener('mouseleave') mouseleave() {
    if (this.trigger === 'hover') this.hide();
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    let contentChange = changes.content;
    if (contentChange && contentChange.currentValue != contentChange.previousValue) {
      this.contentChange.next(this.content);
    }
    let visibleChange = changes.visible;
    if (visibleChange && visibleChange.currentValue != visibleChange.previousValue) {
      if (this.visible) this.show();
      else this.hide();
    }
  }

  ngOnDestroy(): void {}

  ngAfterViewInit() {}

  show() {
    if (this.timeoutHide) clearTimeout(this.timeoutHide);
    if (!this.portal || (this.portal && !this.portal.overlayRef?.hasAttached())) {
      this.visible = true;
      this.createPortal();
      this.visibleChange.emit(this.visible);
    }
  }

  hide() {
    if (this.portal.overlayRef?.hasAttached()) {
      this.timeoutHide = setTimeout(() => {
        this.visible = false;
        this.portal.overlayRef?.dispose();
        this.visibleChange.emit(this.visible);
      });
    }
  }

  createPortal() {
    this.portal = this.portalService.attach({
      content: XPopoverPortalComponent,
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
      title: this.title,
      content: this.content,
      footer: this.footer,
      contentChange: this.contentChange,
      trigger: this.trigger,
      placement: this.placement,
      width: this.width,
      portalHover: (hover: boolean) => {
        if (this.timeoutHide && hover) {
          clearTimeout(this.timeoutHide);
        } else {
          this.hide();
        }
      },
      closePortal: () => this.hide(),
      viewInit: () => this.portal.overlayRef?.updatePosition()
    });
    componentRef.changeDetectorRef.detectChanges();
  }

  update() {
    if (this.portal) this.portal.overlayRef?.updatePosition();
  }
}
