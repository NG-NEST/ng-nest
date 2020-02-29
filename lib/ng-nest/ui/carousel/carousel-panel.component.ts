import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Input,
  Host,
  Optional
} from "@angular/core";
import { XCarouselPanelPrefix } from "./carousel.type";
import { XInputBoolean, dropAnimation } from "@ng-nest/ui/core";
import { XCarouselComponent } from "./carousel.component";
import { DomSanitizer } from "@angular/platform-browser";
import { BehaviorSubject, Observable, Subscription } from "rxjs";

@Component({
  selector: `${XCarouselPanelPrefix}`,
  templateUrl: "./carousel-panel.component.html",
  styleUrls: ["./carousel-panel.component.scss"],
  animations: [dropAnimation],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCarouselPanelComponent implements OnInit {
  @Input() @XInputBoolean() active = false;
  index?: number;
  width?: number;
  height?: number;
  animating?: boolean;
  preTranslate?: number;
  cardScale = 0.83;
  scale = 1;
  inStage = false;
  updateSub = new BehaviorSubject(false);
  updateSub$: Subscription;
  constructor(
    @Optional() @Host() public carousel: XCarouselComponent,
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public sanitizer: DomSanitizer,
    public cdr: ChangeDetectorRef
  ) {}

  setActive() {
    const isActive: boolean = this.carousel.active === this.index;
    if (this.active !== isActive) {
      this.active = isActive;
      this.setClass("x-active", this.active);
    }
  }

  setStyles() {
    this.width = this.elementRef.nativeElement.offsetWidth;
    this.height = this.elementRef.nativeElement.offsetHeight;

    let translate: number;
    let offset: number = this.carousel.active - this.index;
    let distance = this.width;
    let translateType = "translateX";
    if (this.carousel.card) {
      if (this.carousel.direction === "vertical") {
        console.warn(
          "[x-carousel] vertical direction is not supported in card mode"
        );
      }
      this.inStage = Math.round(Math.abs(offset)) <= 1;
      this.setClass("x-carousel-in-stage", this.inStage);
      translate = this.calcCardTranslate(this.index, this.carousel.active);
      this.scale = offset === 0 ? 1 : this.cardScale;
    } else {
      if (this.carousel.direction === "vertical") {
        distance = this.height;
        translateType = "translateY";
      }
      const map: any = {
        "-2": -distance,
        "-1": distance,
        "0": 0,
        "1": 0 - distance,
        "2": distance
      };
      offset = offset < -2 ? -2 : offset > 2 ? 2 : offset;
      translate = map[offset];
    }
    this.animating =
      this.carousel.active === this.index ||
      this.carousel.before === this.index ||
      this.carousel.start === Math.abs(offset) ||
      this.carousel.card;
    this.setClass("x-carousel-animating", this.animating);
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      "transform",
      `${translateType}(${translate}px) scale(${this.scale})`
    );
  }

  calcCardTranslate(index, activeIndex) {
    const parentWidth = this.carousel.carousel.nativeElement.offsetWidth;
    let offset: number = index - activeIndex;
    let activeFirstOrLast =
      this.carousel.start > 1 && this.carousel.start === Math.abs(offset);
    if (this.inStage || activeFirstOrLast) {
      if (activeFirstOrLast) offset = offset < 0 ? 1 : -1;
      return (parentWidth * ((2 - this.cardScale) * offset + 1)) / 4;
    } else if (index < activeIndex) {
      return (-(1 + this.cardScale) * parentWidth) / 4;
    } else {
      return ((3 + this.cardScale) * parentWidth) / 4;
    }
  }

  update() {
    this.setActive();
    this.setStyles();
    this.cdr.detectChanges();
  }

  panelClick() {
    if (this.carousel.card && this.carousel.active !== this.index) {
      this.carousel.setActiveItem(this.index);
    }
  }

  setClass(cls: string, value: boolean) {
    if (value) this.renderer.addClass(this.elementRef.nativeElement, cls);
    else this.renderer.removeClass(this.elementRef.nativeElement, cls);
  }

  ngOnInit() {
    this.carousel.start++;
    this.index = this.carousel.start;
    this.setClass("x-carousel-card", this.carousel.card);
    this.carousel.panelChanges.push(this.updateSub);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.updateSub.subscribe(x => {
        if (x) this.update();
      });
    });
  }

  ngOnDestroy(): void {
    this.updateSub$ && this.updateSub$.unsubscribe();
  }
}
