import {
  OnInit,
  ElementRef,
  Input,
  ViewContainerRef,
  Directive,
  HostListener,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  Output,
  EventEmitter
} from '@angular/core';
import { XPlacement, XInputBoolean } from '@ng-nest/ui/core';
import { XPortalService, XPortalOverlayRef } from '@ng-nest/ui/portal';
import { XPopoverPortalComponent } from './popover-portal.component';
import { XPopoverPortal, XPopoverTrigger } from './popover.type';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[x-popover], x-popover'
})
export class XPopoverDirective implements OnInit, OnChanges {
  @Input() title?: string | TemplateRef<void>;
  @Input() content?: string | TemplateRef<void>;
  @Input() footer?: string | TemplateRef<void>;
  @Input() placement: XPlacement = 'bottom';
  @Input() trigger: XPopoverTrigger = 'hover';
  @Input() width: string = '10rem';
  @Input() @XInputBoolean() visible?: boolean = false;
  @Output() visibleChange = new EventEmitter();
  portal: XPortalOverlayRef;
  box: DOMRect;
  contentChange: BehaviorSubject<any> = new BehaviorSubject(null);
  timeoutHide: any;
  constructor(
    private elementRef: ElementRef,
    private portalService: XPortalService,
    private viewContainerRef: ViewContainerRef
  ) {}

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
    if (!this.portal || (this.portal && !this.portal.overlayRef.hasAttached())) {
      this.visible = true;
      this.createPortal();
      this.visibleChange.emit(this.visible);
    }
  }

  hide() {
    if (this.portal && this.portal.overlayRef.hasAttached()) {
      this.timeoutHide = setTimeout(() => {
        this.visible = false;
        this.portal.overlayRef.dispose();
        this.visibleChange.emit(this.visible);
      });
    }
  }

  createPortal() {
    this.box = this.elementRef.nativeElement.getBoundingClientRect();
    this.portal = this.portalService.create({
      content: XPopoverPortalComponent,
      viewContainerRef: this.viewContainerRef,
      injector: this.portalService.createInjector(
        {
          box: this.box,
          title: this.title,
          content: this.content,
          footer: this.footer,
          contentChange: this.contentChange,
          trigger: this.trigger,
          placement: this.placement,
          width: this.width,
          portalHover: hover => {
            if (this.timeoutHide && hover) {
              clearTimeout(this.timeoutHide);
            } else {
              this.hide();
            }
          },
          closePortal: () => this.hide(),
          viewInit: () => this.portal.overlayRef.updatePosition()
        },
        XPopoverPortal
      ),
      overlayConfig: {
        backdropClass: '',
        positionStrategy: this.portalService.setPositionStrategy(this.elementRef, this.placement)
      }
    });
  }

  update() {
    if (this.portal) this.portal.overlayRef.updatePosition();
  }
}
