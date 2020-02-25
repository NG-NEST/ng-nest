import {
  OnInit,
  ElementRef,
  Input,
  ViewContainerRef,
  Directive,
  HostListener,
  OnChanges,
  SimpleChanges,
  TemplateRef
} from "@angular/core";
import { XPlacement, XInputBoolean } from "@ng-nest/ui/core";
import { XPortalService, XPortalOverlayRef } from "@ng-nest/ui/portal";
import { XPopoverPortalComponent } from "./popover-portal.component";
import { XPopoverPortal, XPopoverTrigger } from "./popover.type";
import { BehaviorSubject } from "rxjs";

@Directive({
  selector: "[x-popover], x-popover"
})
export class XPopoverDirective implements OnInit, OnChanges {
  @Input() title?: string | TemplateRef<void>;
  @Input() content?: string | TemplateRef<void>;
  @Input() placement: XPlacement = "bottom";
  @Input() trigger: XPopoverTrigger = "hover";
  @Input() @XInputBoolean() visible?: boolean = false;
  portal: XPortalOverlayRef;
  box: DOMRect;
  contentChange: BehaviorSubject<any> = new BehaviorSubject(null);
  timeoutHide: any;
  constructor(
    private elementRef: ElementRef,
    private portalService: XPortalService,
    private viewContainerRef: ViewContainerRef
  ) {}

  @HostListener("click") click() {
    if (this.trigger === "click") {
      this.visible = !this.visible;
      if (this.visible) this.show();
      else this.hide();
    }
  }

  @HostListener("mouseenter") mouseenter() {
    if (this.trigger === "hover") this.show();
  }

  @HostListener("mouseleave") mouseleave() {
    if (this.trigger === "hover") this.hide();
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    let contentChange = changes.content;
    if (contentChange && contentChange.currentValue != contentChange.previousValue) {
      this.contentChange.next(this.content);
    }
  }

  ngOnDestroy(): void {}

  ngAfterViewInit() {}

  show() {
    if (this.timeoutHide) clearTimeout(this.timeoutHide);
    if (!this.portal || (this.portal && !this.portal.overlayRef.hasAttached())) {
      this.visible = true;
      this.createPortal();
    }
  }

  hide() {
    if (this.portal && this.portal.overlayRef.hasAttached()) {
      this.timeoutHide = setTimeout(() => {
        this.visible = false;
        this.portal.overlayRef.dispose();
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
          contentChange: this.contentChange,
          trigger: this.trigger,
          placement: this.placement,
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
        backdropClass: "",
        positionStrategy: this.portalService.setPositionStrategy(this.elementRef, this.placement)
      }
    });
  }

  update() {
    if (this.portal) this.portal.overlayRef.updatePosition();
  }
}
