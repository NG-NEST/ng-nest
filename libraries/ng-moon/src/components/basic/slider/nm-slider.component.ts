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
  EventEmitter,
  TemplateRef,
  AfterViewInit,
  AfterViewChecked,
  AfterContentChecked
} from "@angular/core";
import {
  SliderPrefix,
  NmSliderOption,
  NmSliderLayoutEnum,
  NmSliderBorderPositionEnum,
  NmActivatedSlider,
  NmSliderNode
} from "./nm-slider.type";
import { fillDefault } from "../../../core/util";
import { NmData } from "../../../interfaces/data.type";
import { BehaviorSubject, Subscription } from "rxjs";

@Component({
  selector: "nm-slider",
  templateUrl: "./nm-slider.component.html",
  styleUrls: ["./style/index.scss"],
  // encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmSliderComponent implements OnInit, OnChanges {
  @Input() nmData?: NmData<NmSliderNode[]>;
  @Input() nmLayout?: NmSliderLayoutEnum;
  @Input() nmBorderPosition?: NmSliderBorderPositionEnum;
  @Input() nmNodeTemplate?: TemplateRef<any>;

  private _nmActivatedIndex: number;
  public get nmActivatedIndex(): number {
    return this._nmActivatedIndex;
  }
  @Input()
  public set nmActivatedIndex(value: number) {
    this._nmActivatedIndex = value;
  }

  @Output() nmActivatedChange?: EventEmitter<NmActivatedSlider> = new EventEmitter<
    NmActivatedSlider
  >();

  private _default: NmSliderOption = {
    nmData: [],
    nmLayout: NmSliderLayoutEnum.Row,
    nmBorderPosition: NmSliderBorderPositionEnum.Bottom,
    nmActivatedIndex: 0
  };

  @ViewChild("sliders", { static: true }) slidersRef: ElementRef;
  @ViewChild("highlight", { static: true }) highlightRef: ElementRef;
  data: NmSliderNode[] = [];

  private _data$: Subscription | null = null;

  @HostBinding(`class.nm-slider-row`)
  get getLayoutRow() {
    if (this.nmLayout === NmSliderLayoutEnum.Row) {
      if (
        [NmSliderBorderPositionEnum.Left, NmSliderBorderPositionEnum.Right].indexOf(
          this.nmBorderPosition
        ) > -1
      ) {
        this.nmBorderPosition = NmSliderBorderPositionEnum.Bottom;
      }
      return true;
    }
    return false;
  }

  @HostBinding(`class.nm-slider-column`)
  get getLayoutColumn() {
    if (this.nmLayout === NmSliderLayoutEnum.Column) {
      if (
        [NmSliderBorderPositionEnum.Top, NmSliderBorderPositionEnum.Bottom].indexOf(
          this.nmBorderPosition
        ) > -1
      ) {
        this.nmBorderPosition = NmSliderBorderPositionEnum.Left;
      }
      return true;
    }
    return false;
  }

  @HostBinding(`class.nm-slider-border-position-top`)
  get getBorderPositionTop() {
    return this.nmBorderPosition == NmSliderBorderPositionEnum.Top;
  }

  @HostBinding(`class.nm-slider-border-position-right`)
  get getBorderPositionRight() {
    return this.nmBorderPosition == NmSliderBorderPositionEnum.Right;
  }

  @HostBinding(`class.nm-slider-border-position-bottom`)
  get getBorderPositionBottom() {
    return this.nmBorderPosition == NmSliderBorderPositionEnum.Bottom;
  }

  @HostBinding(`class.nm-slider-border-position-left`)
  get getBorderPositionLeft() {
    return this.nmBorderPosition == NmSliderBorderPositionEnum.Left;
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

  ngOnChanges(changes: SimpleChanges): void {
    const nmDataChange = changes.nmData;
    if (nmDataChange && nmDataChange.currentValue !== nmDataChange.previousValue) {
      this.setData();
    }
  }

  ngOnDestroy(): void {
    this.removeListen();
  }

  private removeListen() {
    if (this._data$) this._data$.unsubscribe();
  }

  action(type: string, option?: any, index?: any) {
    switch (type) {
      case "click":
        this.nmActivatedIndex = index;
        this.nmActivatedChange.emit({
          nmActivatedIndex: index,
          nmActivatedSlider: option
        });
        this.cdr.detectChanges();
        break;
    }
  }

  isActivatied(i: number) {
    if (i == this.nmActivatedIndex) {
      setTimeout(() => this.setHighlight());
    }
    return i == this.nmActivatedIndex;
  }

  private setData() {
    if (typeof this.nmData === "undefined") {
      return;
    }
    if (this.nmData instanceof Array) {
      this.setDataChange(this.nmData);
    } else if (this.nmData instanceof BehaviorSubject) {
      if (this._data$) this._data$.unsubscribe();
      this._data$ = this.nmData.subscribe(x => {
        this.setDataChange(x);
      });
    }
  }

  private setDataChange(value: NmSliderNode[]) {
    this.data = value;
    this.cdr.detectChanges();
  }

  private setHighlight() {
    const activeEle = this.slidersRef.nativeElement.querySelector(
      `li:nth-child(${this.nmActivatedIndex + 1})`
    );
    if (activeEle) {
      let eleWidth = activeEle.offsetWidth;
      let eleHeight = activeEle.offsetHeight;
      // if (eleWidth == 0) {
      //   console.log(this.getEleDisplay(activeEle));
      // }
      const width = this.nmLayout == NmSliderLayoutEnum.Column ? "100%" : `${eleWidth}px`;
      this.renderer.setStyle(this.highlightRef.nativeElement, "width", width);
      this.renderer.setStyle(this.highlightRef.nativeElement, "height", `${eleHeight}px`);
      this.renderer.setStyle(this.highlightRef.nativeElement, "left", `${activeEle.offsetLeft}px`);
      this.renderer.setStyle(this.highlightRef.nativeElement, "top", `${activeEle.offsetTop}px`);
    }
  }

  private getEleDisplay(ele: HTMLElement) {
    this.renderer.setStyle(ele, "display", "");
    this.renderer.setStyle(ele, "position", "absolute");
    this.renderer.setStyle(ele, "visibility", "hidden");

    console.log(ele.offsetWidth, ele.offsetHeight, ele.offsetLeft, ele.offsetTop);

    this.renderer.setStyle(ele, "display", "none");
    this.renderer.setStyle(ele, "position", "");
    this.renderer.setStyle(ele, "visibility", "");
  }
}
