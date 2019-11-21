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
  XSliderInput,
  XActivatedSlider,
  XSliderNode,
  XSliderLayoutType,
  XSliderBorderPositionType
} from "./slider.type";
import { fillDefault, XData } from "@ng-nest/ui/core";
import { Subscription } from "rxjs";

@Component({
  selector: "x-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./style/index.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XSliderComponent implements OnInit, OnChanges {
  @Input() data?: XData<XSliderNode[]>;
  @Input() layout?: XSliderLayoutType;
  @Input() borderPosition?: XSliderBorderPositionType;
  @Input() nodeTemplate?: any;

  activatedSlider: XSliderNode;
  highlightHidden: boolean;

  private _activatedIndex: number;
  public get activatedIndex(): number {
    return this._activatedIndex;
  }
  @Input()
  public set activatedIndex(value: number) {
    this._activatedIndex = value;
    if (this.sliderNodes.length > 0) {
      this.activatedSlider = this.sliderNodes[value];
    }
    this.setHighlight();
    this.cdr.detectChanges();
  }

  @Output() indexChange?: EventEmitter<XActivatedSlider> = new EventEmitter<XActivatedSlider>();

  private _default: XSliderInput = {
    data: [],
    layout: "row",
    activatedIndex: 0
  };

  @ViewChild("sliders", { static: true }) slidersRef: ElementRef;
  @ViewChild("highlight", { static: true }) highlightRef: ElementRef;
  sliderNodes: XSliderNode[] = [];

  private _data$: Subscription | null = null;

  @HostBinding(`class.x-slider-row`)
  get getLayoutRow() {
    if (this.layout === "row") {
      if (["left", "right"].indexOf(this.borderPosition) > -1) {
        this.borderPosition = "bottom";
      }
      return true;
    }
    return false;
  }

  @HostBinding(`class.x-slider-column`)
  get getLayoutColumn() {
    if (this.layout === "column") {
      if (["top", "bottom"].indexOf(this.borderPosition) > -1) {
        this.borderPosition = "left";
      }
      return true;
    }
    return false;
  }

  @HostBinding(`class.x-slider-border-position-top`)
  get getBorderPositionTop() {
    return this.borderPosition === "top";
  }

  @HostBinding(`class.x-slider-border-position-right`)
  get getBorderPositionRight() {
    return this.borderPosition === "right";
  }

  @HostBinding(`class.x-slider-border-position-bottom`)
  get getBorderPositionBottom() {
    return this.borderPosition === "bottom";
  }

  @HostBinding(`class.x-slider-border-position-left`)
  get getBorderPositionLeft() {
    return this.borderPosition === "left";
  }

  @HostBinding(`class.x-slider-border-show`)
  get getBorderHidden() {
    return typeof this.borderPosition !== "undefined";
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private cdr: ChangeDetectorRef) {
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
    const dataChange = changes.data;
    if (dataChange && dataChange.currentValue !== dataChange.previousValue) {
      this.setData();
    }
  }

  ngOnDestroy(): void {
    this.removeListen();
  }

  action(type: string, option?: any, index?: any) {
    switch (type) {
      case "click":
        this.activatedIndex = index;
        this.activatedSlider = option;
        this.setHighlight();
        this.indexChange.emit({
          activatedIndex: this.activatedIndex,
          activatedSlider: this.activatedSlider
        });
        this.cdr.detectChanges();
        break;
    }
  }

  setHighlight() {
    const activeEle = this.slidersRef.nativeElement.querySelector(`li:nth-child(${this.activatedIndex + 1})`);
    if (!activeEle) return;
    const width = this.layout == "column" ? "100%" : `${activeEle.offsetWidth}px`;
    this.renderer.setStyle(this.highlightRef.nativeElement, "width", width);
    this.renderer.setStyle(this.highlightRef.nativeElement, "height", `${activeEle.offsetHeight}px`);
    this.renderer.setStyle(this.highlightRef.nativeElement, "left", `${activeEle.offsetLeft}px`);
    this.renderer.setStyle(this.highlightRef.nativeElement, "top", `${activeEle.offsetTop}px`);
    this.highlightHidden = activeEle.offsetWidth === 0 && activeEle.offsetHeight === 0;
  }

  private removeListen() {
    if (this._data$) this._data$.unsubscribe();
  }

  private setData() {
    if (this.data instanceof Array) {
      this.setDataChange(this.data);
    } else {
      if (this._data$) this._data$.unsubscribe();
      this._data$ = this.data.subscribe(x => {
        this.setDataChange(x);
      });
    }
  }

  private setDataChange(value: XSliderNode[]) {
    this.sliderNodes = value;
    if (this.sliderNodes.length > 0) {
      this.activatedSlider = this.sliderNodes[this.activatedIndex];
    }
    setTimeout(() => this.setHighlight());
    this.cdr.detectChanges();
  }
}
