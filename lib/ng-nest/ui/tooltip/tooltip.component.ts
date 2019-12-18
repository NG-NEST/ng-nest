import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  Input,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import { removeNgTag, XPlacement } from "@ng-nest/ui/core";
import { XPortalService, XPortalOverlayRef } from "@ng-nest/ui/portal";
import { XTooltipPortalComponent } from "./tooltip-portal.component";
import { XTooltipPortal } from "./tooltip.type";
import { Subject } from "rxjs";

@Component({
  selector: "x-tooltip",
  templateUrl: "./tooltip.component.html",
  styleUrls: ["./tooltip.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTooltipComponent implements OnInit {
  @Input() content?: string;
  @Input() placement?: XPlacement = "bottom";
  @ViewChild("tooltip", { static: true }) tooltip: ElementRef;
  portal: XPortalOverlayRef;
  box: DOMRect;
  contentChange: Subject<any> = new Subject();
  constructor(
    private elementRef: ElementRef,
    private portalService: XPortalService,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    removeNgTag(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {}

  menter(event: Event) {
    this.createPortal();
  }

  mleave(event: Event) {
    if (this.portal) this.portal.overlayRef.dispose();
  }

  createPortal() {
    this.box = this.tooltip.nativeElement.getBoundingClientRect();
    this.portal = this.portalService.create({
      content: XTooltipPortalComponent,
      viewContainerRef: this.viewContainerRef,
      injector: this.portalService.createInjector(
        {
          box: this.box,
          content: this.content,
          contentChange: this.contentChange,
          placement: this.placement,
          viewInit: () => this.portal.overlayRef.updatePosition()
        },
        XTooltipPortal
      ),
      overlayConfig: {
        backdropClass: "",
        positionStrategy: this.portalService.setPositionStrategy(this.tooltip, this.placement)
      }
    });
  }
}
