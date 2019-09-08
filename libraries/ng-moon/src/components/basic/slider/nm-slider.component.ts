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
  TemplateRef
} from "@angular/core";
import {
  SliderPrefix,
  NmSliderOption,
  NmActivatedSlider,
  NmSliderNode,
  NmSliderLayoutType,
  NmSliderBorderPositionType
} from "./nm-slider.type";
import { fillDefault } from "../../../core/util";
import { NmData } from "../../../interfaces/data.type";
import { BehaviorSubject, Subscription } from "rxjs";

@Component({
  selector: "nm-slider",
  templateUrl: "./nm-slider.component.html",
  styleUrls: ["./style/index.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmSliderComponent implements OnInit, OnChanges {
  @Input() nmData?: NmData<NmSliderNode[]>;
  @Input() nmLayout?: NmSliderLayoutType;
  @Input() nmBorderPosition?: NmSliderBorderPositionType;
  @Input() nmNodeTemplate?: TemplateRef<any>;

  nmActivatedSlider: NmSliderNode;
  nmHighlightHidden: boolean;

  private _nmActivatedIndex: number;
  public get nmActivatedIndex(): number {
    return this._nmActivatedIndex;
  }
  @Input()
  public set nmActivatedIndex(value: number) {
    this._nmActivatedIndex = value;
    if (this.data.length > 0) {
      this.nmActivatedSlider = this.data[value];
    }
    this.setHighlight();
    this.cdr.detectChanges();
  }

  @Output() nmActivatedChange?: EventEmitter<
    NmActivatedSlider
  > = new EventEmitter<NmActivatedSlider>();

  private _default: NmSliderOption = {
    nmData: [],
    nmLayout: "row",
    nmActivatedIndex: 0
  };

  @ViewChild("sliders", { static: true }) slidersRef: ElementRef;
  @ViewChild("highlight", { static: true }) highlightRef: ElementRef;
  data: NmSliderNode[] = [];

  private _data$: Subscription | null = null;

  @HostBinding(`class.nm-slider-row`)
  get getLayoutRow() {
    if (this.nmLayout === "row") {
      if (["left", "right"].indexOf(this.nmBorderPosition) > -1) {
        this.nmBorderPosition = "bottom";
      }
      return true;
    }
    return false;
  }

  @HostBinding(`class.nm-slider-column`)
  get getLayoutColumn() {
    if (this.nmLayout === "column") {
      if (["top", "bottom"].indexOf(this.nmBorderPosition) > -1) {
        this.nmBorderPosition = "left";
      }
      return true;
    }
    return false;
  }

  @HostBinding(`class.nm-slider-border-position-top`)
  get getBorderPositionTop() {
    return this.nmBorderPosition === "top";
  }

  @HostBinding(`class.nm-slider-border-position-right`)
  get getBorderPositionRight() {
    return this.nmBorderPosition === "right";
  }

  @HostBinding(`class.nm-slider-border-position-bottom`)
  get getBorderPositionBottom() {
    return this.nmBorderPosition === "bottom";
  }

  @HostBinding(`class.nm-slider-border-position-left`)
  get getBorderPositionLeft() {
    return this.nmBorderPosition === "left";
  }

  @HostBinding(`class.nm-slider-border-show`)
  get getBorderHidden() {
    return typeof this.nmBorderPosition !== "undefined";
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
    const nmDataChange = changes.nmData;
    if (
      nmDataChange &&
      nmDataChange.currentValue !== nmDataChange.previousValue
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
        this.nmActivatedIndex = index;
        this.nmActivatedSlider = option;
        this.setHighlight();
        this.nmActivatedChange.emit({
          nmActivatedIndex: this.nmActivatedIndex,
          nmActivatedSlider: this.nmActivatedSlider
        });
        this.cdr.detectChanges();
        break;
    }
  }

  setHighlight() {
    const activeEle = this.slidersRef.nativeElement.querySelector(
      `li:nth-child(${this.nmActivatedIndex + 1})`
    );
    if (!activeEle) return;
    const width =
      this.nmLayout == "column" ? "100%" : `${activeEle.offsetWidth}px`;
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
    this.nmHighlightHidden =
      activeEle.offsetWidth === 0 && activeEle.offsetHeight === 0;
  }

  private removeListen() {
    if (this._data$) this._data$.unsubscribe();
  }

  private setData() {
    if (this.nmData instanceof Array) {
      this.setDataChange(this.nmData);
    } else {
      if (this._data$) this._data$.unsubscribe();
      this._data$ = this.nmData.subscribe(x => {
        this.setDataChange(x);
      });
    }
  }

  private setDataChange(value: NmSliderNode[]) {
    this.data = value;
    if (this.data.length > 0) {
      this.nmActivatedSlider = this.data[this.nmActivatedIndex];
    }
    setTimeout(() => this.setHighlight());
    this.cdr.detectChanges();
  }
}
