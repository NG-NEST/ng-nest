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
  NmTabsLayoutEnum,
  NmTabsNode,
  NmActivatedTab
} from "./nm-tabs.type";
import { fillDefault } from "../../../core/util";
import { NmData } from "../../../interfaces/data.type";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import {
  NmSliderNode,
  NmSliderBorderPositionEnum,
  NmSliderLayoutEnum,
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
    if (this._nmLayout === NmTabsLayoutEnum.Top) {
      this.setSliderOption({
        nmLayout: NmSliderLayoutEnum.Row,
        nmBorderPosition: NmSliderBorderPositionEnum.Bottom
      });
    } else if (this._nmLayout === NmTabsLayoutEnum.Right) {
      this.setSliderOption({
        nmLayout: NmSliderLayoutEnum.Column,
        nmBorderPosition: NmSliderBorderPositionEnum.Left
      });
    } else if (this._nmLayout === NmTabsLayoutEnum.Bottom) {
      this.setSliderOption({
        nmLayout: NmSliderLayoutEnum.Row,
        nmBorderPosition: NmSliderBorderPositionEnum.Top
      });
    } else if (this._nmLayout === NmTabsLayoutEnum.Left) {
      this.setSliderOption({
        nmLayout: NmSliderLayoutEnum.Column,
        nmBorderPosition: NmSliderBorderPositionEnum.Right
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
    this.cdr.detectChanges();
  }

  private _nmResetTabs: boolean;
  public get nmResetTabs(): boolean {
    return this._nmResetTabs;
  }
  @Input()
  public set nmResetTabs(value: boolean) {
    this._nmResetTabs = value;
    console.log(value);
    if (value && this.slider) {
    }
  }

  // @Input() nmNodeTemplate?: TemplateRef<any>;

  sliderOption: NmSliderOption = {
    nmData: new BehaviorSubject<NmSliderNode[]>([]),
    nmLayout: NmSliderLayoutEnum.Row,
    nmActivatedIndex: 0,
    nmBorderPosition: NmSliderBorderPositionEnum.Bottom
  };
  data: NmTabsNode[] = [];
  @Output() nmActivatedChange?: EventEmitter<NmActivatedTab> = new EventEmitter<NmActivatedTab>();
  private _default: NmTabsOption = {
    nmLayout: NmTabsLayoutEnum.Top,
    nmActivatedIndex: 0
  };

  private _data$: Subscription | null = null;

  @ContentChildren(NmTabComponent) listTabs: Array<NmTabComponent>;

  @ViewChild(NmSliderComponent, { static: false }) slider: NmSliderComponent;

  @HostBinding(`class.nm-tabs-top`)
  get getLayoutTop() {
    return this.nmLayout === NmTabsLayoutEnum.Top;
  }
  @HostBinding(`class.nm-tabs-right`)
  get getLayoutRight() {
    return this.nmLayout === NmTabsLayoutEnum.Right;
  }
  @HostBinding(`class.nm-tabs-bottom`)
  get getLayoutBottom() {
    return this.nmLayout === NmTabsLayoutEnum.Bottom;
  }
  @HostBinding(`class.nm-tabs-left`)
  get getLayoutLeft() {
    return this.nmLayout === NmTabsLayoutEnum.Left;
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
    // console.log(this.listTabs);
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
      this.sliderOption.nmData.next(this.data);
    }
    this.cdr.detectChanges();
  }

  private setSliderOption(value: NmSliderOption) {
    this.sliderOption = Object.assign(this.sliderOption, value);
  }
}
