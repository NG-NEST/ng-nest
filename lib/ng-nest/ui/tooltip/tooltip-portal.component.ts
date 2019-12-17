import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Inject,
  ChangeDetectorRef,
  OnInit,
  ElementRef,
  OnDestroy,
  ViewChild,
  Renderer2
} from "@angular/core";
import { Subscription } from "rxjs";
import { removeNgTag } from "@ng-nest/ui/core";
import { XTooltipPortal, XTooltipPrefix, XTooltipPortalPrefix } from "./tooltip.type";

@Component({
  selector: "x-tooltip-portal",
  templateUrl: "./tooltip-portal.component.html",
  styleUrls: ["./tooltip-portal.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTooltipPortalComponent implements OnInit, OnDestroy {
  contentChange$: Subscription | null = null;
  classMap = {};
  box: DOMRect;
  arrowBox: DOMRect;
  @ViewChild("tooltipPortal", { static: true }) tooltipPortal: ElementRef;
  @ViewChild("tooltipArrow", { static: false }) tooltipArrow: ElementRef;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    @Inject(XTooltipPortal) public option: any,
    public cdr: ChangeDetectorRef
  ) {
    this.classMap = {
      [`${XTooltipPortalPrefix}-${this.option.placement}`]: true
    };
  }

  ngOnInit(): void {
    this.contentChange$ = this.option.contentChange.subscribe(x => {
      this.option.content = x;
    });

    removeNgTag(this.elementRef.nativeElement);
  }

  ngAfterViewInit() {
    this.box = this.tooltipPortal.nativeElement.getBoundingClientRect();
    this.arrowBox = this.tooltipArrow.nativeElement.getBoundingClientRect();
    this.setArrow();
    this.option.viewInit();
    this.cdr.detectChanges();
  }

  ngAfterContentInit() {}

  ngOnDestroy(): void {
    this.contentChange$ && this.contentChange$.unsubscribe();
  }

  setArrow() {
    let offset = this.arrowBox.height / 2;
    if (this.box.height > this.option.box.height && (this.includes("right-") || this.includes("left-"))) {
      if (this.includes("-start")) {
        this.renderer.setStyle(this.tooltipArrow.nativeElement, "top", `${this.option.box.height / 2 - offset}px`);
      } else if (this.includes("-end")) {
        this.renderer.setStyle(this.tooltipArrow.nativeElement, "bottom", `${this.option.box.height / 2 - offset}px`);
      }
    } else if (this.box.width > this.option.box.width && (this.includes("top-") || this.includes("bottom-"))) {
      if (this.includes("-start")) {
        this.renderer.setStyle(this.tooltipArrow.nativeElement, "left", `${this.option.box.width / 2 - offset}px`);
      } else if (this.includes("-end")) {
        this.renderer.setStyle(this.tooltipArrow.nativeElement, "right", `${this.option.box.width / 2 - offset}px`);
      }
    }
  }

  includes(arrow) {
    return this.option.placement.indexOf(arrow) >= 0;
  }
}
