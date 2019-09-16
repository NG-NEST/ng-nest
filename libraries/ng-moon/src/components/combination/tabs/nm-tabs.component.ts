import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  ContentChildren,
  ElementRef,
  Renderer2,
  AfterContentChecked,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import {
  TabsPrefix,
  NmTabsOption,
  NmTabsLayoutType,
  NmTabsNode,
  NmActivatedTab
} from "./nm-tabs.type";
import { fillDefault } from "../../../core/util";
import { NmData } from "../../../interfaces/data.type";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import {
  NmSliderNode,
  NmActivatedSlider,
  NmSliderOption,
  NmSliderComponent
} from "../../basic/slider";
import { NmTabComponent } from "./nm-tab.component";

@Component({
  selector: "nm-tabs",
  templateUrl: "./nm-tabs.component.html",
  styleUrls: ["./style/index.scss"],
  // Todo: 使用 ShadowDom 模式后，模板中使用 ng-content 里面的内容无法显示
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmTabsComponent implements OnInit, OnChanges {
  @Input() nmData?: NmData<NmTabsNode[]>;

  private _nmLayout?: any;
  public get nmLayout(): any {
    return this._nmLayout;
  }
  @Input()
  public set nmLayout(value: any) {
    this._nmLayout = value;
    if (this._nmLayout === "top") {
      this.setSliderOption({
        nmLayout: "row",
        nmBorderPosition: "bottom"
      });
    } else if (this._nmLayout === "right") {
      this.setSliderOption({
        nmLayout: "column",
        nmBorderPosition: "left"
      });
    } else if (this._nmLayout === "bottom") {
      this.setSliderOption({
        nmLayout: "row",
        nmBorderPosition: "top"
      });
    } else if (this._nmLayout === "left") {
      this.setSliderOption({
        nmLayout: "column",
        nmBorderPosition: "right"
      });
    }
    this.cdr.detectChanges();
  }

  private _nmActivatedIndex: number;
  public get nmActivatedIndex(): number {
    return this._nmActivatedIndex;
  }
  @Input()
  public set nmActivatedIndex(value: number) {
    this._nmActivatedIndex = value;
    this.sliderOption.nmActivatedIndex = value;
    this.cdr.detectChanges();
  }

  sliderOption: NmSliderOption = {
    nmData: new BehaviorSubject<NmSliderNode[]>([]),
    nmLayout: "row",
    nmActivatedIndex: 0,
    nmBorderPosition: "bottom"
  };
  sliderHidden: boolean = false;
  data: NmTabsNode[] = [];
  @Output() nmActivatedChange?: EventEmitter<NmActivatedTab> = new EventEmitter<
    NmActivatedTab
  >();
  private _default: NmTabsOption = {
    nmLayout: "top",
    nmActivatedIndex: 0
  };

  private _data$: Subscription | null = null;

  @ContentChildren(NmTabComponent) listTabs: Array<NmTabComponent>;

  @ViewChild(NmSliderComponent, { static: false }) slider: NmSliderComponent;

  @HostBinding(`class.nm-tabs-top`)
  get getLayoutTop() {
    return this.nmLayout === "top";
  }
  @HostBinding(`class.nm-tabs-right`)
  get getLayoutRight() {
    return this.nmLayout === "right";
  }
  @HostBinding(`class.nm-tabs-bottom`)
  get getLayoutBottom() {
    return this.nmLayout === "bottom";
  }
  @HostBinding(`class.nm-tabs-left`)
  get getLayoutLeft() {
    return this.nmLayout === "left";
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {
    this.renderer.addClass(this.elementRef.nativeElement, TabsPrefix);
  }

  ngOnInit() {
    fillDefault(this, this._default);
    this.setData();
  }

  ngAfterViewInit() {
    this.setData();
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

  private removeListen() {
    if (this._data$) {
      this._data$.unsubscribe();
    }
  }

  activatedChange(activated: NmActivatedSlider) {
    this.nmActivatedIndex = activated.nmActivatedIndex;
    this.nmActivatedChange.emit({
      nmActivatedIndex: activated.nmActivatedIndex,
      nmActivatedTab: activated.nmActivatedSlider
    });
  }

  private setData() {
    if (typeof this.nmData === "undefined") {
      if (this.listTabs && this.listTabs.length > 0) {
        this.nmData = [];
        this.listTabs.forEach((x, index) => {
          this.nmData = [
            ...(this.nmData as NmTabsNode[]),
            { nmKey: index + 1, nmLabel: x.nmLabel }
          ];
        });
      } else {
        return;
      }
    }
    if (this.nmData instanceof Array) {
      this.setDataChange(this.nmData);
    } else if (this.nmData instanceof BehaviorSubject) {
      if (this._data$) this._data$.unsubscribe();
      this._data$ = this.nmData.subscribe(x => {
        this.setDataChange(x);
      });
    } else if (this.nmData instanceof Observable) {
      if (this._data$) this._data$.unsubscribe();
      this._data$ = this.nmData.subscribe(x => {
        this.setDataChange(x);
      });
    }
  }

  private setDataChange(value: NmSliderNode[]) {
    this.data = value;
    if (this.sliderOption.nmData instanceof BehaviorSubject) {
      this.sliderHidden = this.data.length <= 1;
      this.sliderOption.nmData.next(this.data);
    }
    this.cdr.detectChanges();
  }

  private setSliderOption(value: NmSliderOption) {
    Object.assign(this.sliderOption, value);
  }
}
