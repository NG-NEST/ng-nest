import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
  Renderer2,
  ChangeDetectorRef,
  Output,
  EventEmitter
} from "@angular/core";
import {
  SliderPrefix,
  NuSliderOption,
  NuActivatedSlider,
  NuSliderNode,
  NuSliderLayoutType,
  NuSliderBorderPositionType
} from "./nu-slider.type";
import { fillDefault, NuData } from "@ng-nest/ui/core";
import { Subscription } from "rxjs";

@Component({
  selector: "nu-slider",
  templateUrl: "./nu-slider.component.html",
  styleUrls: ["./style/index.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NuSliderComponent implements OnInit, OnChanges {
  @Input() nuData?: NuData<NuSliderNode[]>;
  @Input() nuLayout?: NuSliderLayoutType;
  @Input() nuBorderPosition?: NuSliderBorderPositionType;
  @Input() nuNodeTemplate?: any;

  nuActivatedSlider: NuSliderNode;
  nuHighlightHidden: boolean;

  private _nuActivatedIndex: number;
  public get nuActivatedIndex(): number {
    return this._nuActivatedIndex;
  }
  @Input()
  public set nuActivatedIndex(value: number) {
    this._nuActivatedIndex = value;
    if (this.data.length > 0) {
      this.nuActivatedSlider = this.data[value];
    }
    this.setHighlight();
    this.cdr.detectChanges();
  }

  @Output() nuActivatedChange?: EventEmitter<
    NuActivatedSlider
  > = new EventEmitter<NuActivatedSlider>();

  private _default: NuSliderOption = {
    nuData: [],
    nuLayout: "row",
    nuActivatedIndex: 0
  };

  @ViewChild("sliders", { static: true }) slidersRef: ElementRef;
  @ViewChild("highlight", { static: true }) highlightRef: ElementRef;
  data: NuSliderNode[] = [];

  private _data$: Subscription | null = null;

  @HostBinding(`class.nu-slider-row`)
  get getLayoutRow() {
    if (this.nuLayout === "row") {
      if (["left", "right"].indexOf(this.nuBorderPosition) > -1) {
        this.nuBorderPosition = "bottom";
      }
      return true;
    }
    return false;
  }

  @HostBinding(`class.nu-slider-column`)
  get getLayoutColumn() {
    if (this.nuLayout === "column") {
      if (["top", "bottom"].indexOf(this.nuBorderPosition) > -1) {
        this.nuBorderPosition = "left";
      }
      return true;
    }
    return false;
  }

  @HostBinding(`class.nu-slider-border-position-top`)
  get getBorderPositionTop() {
    return this.nuBorderPosition === "top";
  }

  @HostBinding(`class.nu-slider-border-position-right`)
  get getBorderPositionRight() {
    return this.nuBorderPosition === "right";
  }

  @HostBinding(`class.nu-slider-border-position-bottom`)
  get getBorderPositionBottom() {
    return this.nuBorderPosition === "bottom";
  }

  @HostBinding(`class.nu-slider-border-position-left`)
  get getBorderPositionLeft() {
    return this.nuBorderPosition === "left";
  }

  @HostBinding(`class.nu-slider-border-show`)
  get getBorderHidden() {
    return typeof this.nuBorderPosition !== "undefined";
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {
    this.renderer.addClass(this.elementRef.nativeElement, SliderPrefix);
  }

  ngOnInit() {
    fillDefault(this, this._default);
    this.setData();
  }

  ngAfterViewInit() {
    this.setHighlight();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const nuDataChange = changes.nuData;
    if (
      nuDataChange &&
      nuDataChange.currentValue !== nuDataChange.previousValue
    ) {
      this.setData();
    }
  }

  ngOnDestroy(): void {
    this.removeListen();
  }

  action(type: string, option?: any, index?: any) {
    switch (type) {
      case "click":
        this.nuActivatedIndex = index;
        this.nuActivatedSlider = option;
        this.setHighlight();
        this.nuActivatedChange.emit({
          nuActivatedIndex: this.nuActivatedIndex,
          nuActivatedSlider: this.nuActivatedSlider
        });
        this.cdr.detectChanges();
        break;
    }
  }

  setHighlight() {
    const activeEle = this.slidersRef.nativeElement.querySelector(
      `li:nth-child(${this.nuActivatedIndex + 1})`
    );
    if (!activeEle) return;
    const width =
      this.nuLayout == "column" ? "100%" : `${activeEle.offsetWidth}px`;
    this.renderer.setStyle(this.highlightRef.nativeElement, "width", width);
    this.renderer.setStyle(
      this.highlightRef.nativeElement,
      "height",
      `${activeEle.offsetHeight}px`
    );
    this.renderer.setStyle(
      this.highlightRef.nativeElement,
      "left",
      `${activeEle.offsetLeft}px`
    );
    this.renderer.setStyle(
      this.highlightRef.nativeElement,
      "top",
      `${activeEle.offsetTop}px`
    );
    this.nuHighlightHidden =
      activeEle.offsetWidth === 0 && activeEle.offsetHeight === 0;
  }

  private removeListen() {
    if (this._data$) this._data$.unsubscribe();
  }

  private setData() {
    if (this.nuData instanceof Array) {
      this.setDataChange(this.nuData);
    } else {
      if (this._data$) this._data$.unsubscribe();
      this._data$ = this.nuData.subscribe(x => {
        this.setDataChange(x);
      });
    }
  }

  private setDataChange(value: NuSliderNode[]) {
    this.data = value;
    if (this.data.length > 0) {
      this.nuActivatedSlider = this.data[this.nuActivatedIndex];
    }
    setTimeout(() => this.setHighlight());
    this.cdr.detectChanges();
  }
}
