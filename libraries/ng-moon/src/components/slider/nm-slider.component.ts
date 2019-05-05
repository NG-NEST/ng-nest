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
  ChangeDetectorRef
} from "@angular/core";
import {
  SliderPrefix,
  NmSliderOption,
  NmSliderData,
  NmSliderLayoutEnum,
  NmSliderBorderPositionEnum
} from "./nm-slider.type";
import { fillDefault } from "../../core/util";
import { NmData } from "../../interfaces/data.type";
import { Subject, BehaviorSubject, Observable } from "rxjs";

@Component({
  selector: "nm-slider",
  templateUrl: "./nm-slider.component.html",
  styleUrls: ["./style/index.scss"],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmSliderComponent implements OnInit, OnChanges {
  @Input() nmData?: NmData<NmSliderData[]>;
  @Input() nmLayout?: NmSliderLayoutEnum;
  @Input() nmBorderPosition?: NmSliderBorderPositionEnum;

  private default: NmSliderOption = {
    nmData: [],
    nmLayout: NmSliderLayoutEnum.Row,
    nmBorderPosition: NmSliderBorderPositionEnum.Bottom
  };

  @HostBinding(`class.${SliderPrefix}`) className() {
    return true;
  }

  @HostBinding(`class.${SliderPrefix}-${NmSliderLayoutEnum.Row}`)
  get getLayoutRow() {
    if (this.nmLayout === NmSliderLayoutEnum.Row) {
      if (
        [
          NmSliderBorderPositionEnum.Left,
          NmSliderBorderPositionEnum.Right
        ].indexOf(this.nmBorderPosition) > -1
      ) {
        this.nmBorderPosition = NmSliderBorderPositionEnum.Bottom;
      }
      return true;
    }
    return false;
  }

  @HostBinding(`class.${SliderPrefix}-${NmSliderLayoutEnum.Column}`)
  get getLayoutColumn() {
    if (this.nmLayout === NmSliderLayoutEnum.Column) {
      if (
        [
          NmSliderBorderPositionEnum.Top,
          NmSliderBorderPositionEnum.Bottom
        ].indexOf(this.nmBorderPosition) > -1
      ) {
        this.nmBorderPosition = NmSliderBorderPositionEnum.Left;
      }
      return true;
    }
    return false;
  }

  @HostBinding(
    `class.${SliderPrefix}-border-position-${NmSliderBorderPositionEnum.Top}`
  )
  get getBorderPositionTop() {
    return this.nmBorderPosition == NmSliderBorderPositionEnum.Top;
  }

  @HostBinding(
    `class.${SliderPrefix}-border-position-${NmSliderBorderPositionEnum.Right}`
  )
  get getBorderPositionRight() {
    return this.nmBorderPosition == NmSliderBorderPositionEnum.Right;
  }

  @HostBinding(
    `class.${SliderPrefix}-border-position-${NmSliderBorderPositionEnum.Bottom}`
  )
  get getBorderPositionBottom() {
    return this.nmBorderPosition == NmSliderBorderPositionEnum.Bottom;
  }

  @HostBinding(
    `class.${SliderPrefix}-border-position-${NmSliderBorderPositionEnum.Left}`
  )
  get getBorderPositionLeft() {
    return this.nmBorderPosition == NmSliderBorderPositionEnum.Left;
  }

  @ViewChild("sliders") slidersRef: ElementRef;
  @ViewChild("highlight") highlightRef: ElementRef;
  _data: NmSliderData[] = [];
  _activeIndex: number = 0;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    fillDefault(this, this.default);
    this.setData();
  }

  ngAfterViewInit() {
    this.setHighlight();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const nmDataChange = changes.nmData;
    if (
      nmDataChange &&
      nmDataChange.currentValue !== nmDataChange.previousValue
    ) {
      this.setData();
      setTimeout(() => this.setHighlight());
      this.cdr.detectChanges();
    }
  }

  action(type: string, option?: any) {
    switch (type) {
      case "click":
        this._activeIndex = option;
        this.setHighlight();
        this.cdr.detectChanges();
        break;
    }
  }

  setData() {
    if (typeof this.nmData === "undefined") return;
    if (this.nmData instanceof Array) {
      console.log("Array");
      this._data = this.nmData;
    } else if (this.nmData instanceof BehaviorSubject) {
      console.log("BehaviorSubject");
    } else if (this.nmData instanceof Subject) {
      console.log("Subject");
    } else if (this.nmData instanceof Observable) {
      console.log("Observable");
    }
  }

  setHighlight() {
    // debugger;
    const activeEle = this.slidersRef.nativeElement.querySelector(
      `li:nth-child(${this._activeIndex + 1})`
    );
    if (activeEle) {
      this.renderer.setStyle(
        this.highlightRef.nativeElement,
        "width",
        `${activeEle.offsetWidth}px`
      );
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
    }
  }
}
