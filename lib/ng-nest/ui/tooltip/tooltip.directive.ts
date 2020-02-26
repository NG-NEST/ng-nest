import {
  OnInit,
  ElementRef,
  Input,
  ViewContainerRef,
  Directive,
  HostListener,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { XPlacement, XInputBoolean } from "@ng-nest/ui/core";
import { XPortalService, XPortalOverlayRef } from "@ng-nest/ui/portal";
import { XTooltipPortalComponent } from "./tooltip-portal.component";
import { XTooltipPortal } from "./tooltip.type";
import { BehaviorSubject } from "rxjs";

@Directive({
  selector: "[x-tooltip], x-tooltip"
})
export class XTooltipDirective implements OnInit, OnChanges {
  @Input() content?: string;
  @Input() placement?: XPlacement = "bottom";
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

  @HostListener("mouseenter") mouseenter() {
    this.show();
  }

  @HostListener("mouseleave") mouseleave() {
    this.hide();
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
      content: XTooltipPortalComponent,
      viewContainerRef: this.viewContainerRef,
      injector: this.portalService.createInjector(
        {
          box: this.box,
          content: this.content,
          contentChange: this.contentChange,
          placement: this.placement,
          portalHover: hover => {
            if (this.timeoutHide && hover) {
              clearTimeout(this.timeoutHide);
            } else {
              this.hide();
            }
          },
          viewInit: () => this.portal.overlayRef.updatePosition()
        },
        XTooltipPortal
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
