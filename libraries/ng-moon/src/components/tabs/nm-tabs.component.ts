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
  TemplateRef,
  ContentChildren,
  QueryList
} from "@angular/core";
import {
  TabsPrefix,
  NmTabsOption,
  NmTabsLayoutEnum,
  NmActivatedTabs,
  NmTabsNode
} from "./nm-tabs.type";
import { fillDefault } from "../../core/util";
import { NmData } from "../../interfaces/data.type";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import {
  NmSliderNode,
  NmSliderBorderPositionEnum,
  NmSliderLayoutEnum,
  NmActivatedSlider,
  NmSliderOption
} from "../slider";
import { NmTabComponent } from "./nm-tab.component";

@Component({
  selector: "nm-tabs",
  templateUrl: "./nm-tabs.component.html",
  styleUrls: ["./style/index.scss"],
  // Todo: 使用 ShadowDom 模式后，模板中使用 ng-content 里面的内容无法显示
  // encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmTabsComponent implements OnInit, OnChanges {
  @Input() nmData?: NmData<NmTabsNode[]>;

  private _nmLayout?: NmTabsLayoutEnum;
  public get nmLayout(): NmTabsLayoutEnum {
    return this._nmLayout;
  }
  @Input()
  public set nmLayout(value: NmTabsLayoutEnum) {
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

  @Input() nmNodeTemplate?: TemplateRef<any>;

  sliderOption: NmSliderOption = {
    nmData: new BehaviorSubject<NmSliderNode[]>([]),
    nmLayout: NmSliderLayoutEnum.Row,
    nmActivatedIndex: 0,
    nmBorderPosition: NmSliderBorderPositionEnum.Bottom
  };
  data: NmTabsNode[] = [];
  @Output() nmActivatedChange?: EventEmitter<
    NmActivatedTabs
  > = new EventEmitter<NmActivatedTabs>();
  private _default: NmTabsOption = {
    nmLayout: NmTabsLayoutEnum.Top,
    nmActivatedIndex: 0
  };

  private _data$: Subscription | null = null;

  @ContentChildren(NmTabComponent) listTabs: QueryList<NmTabComponent>;

  @HostBinding(`class.${TabsPrefix}`) className() {
    return true;
  }

  @HostBinding(`class.${TabsPrefix}-${NmTabsLayoutEnum.Top}`)
  get getLayoutTop() {
    return this.nmLayout == NmTabsLayoutEnum.Top;
  }
  @HostBinding(`class.${TabsPrefix}-${NmTabsLayoutEnum.Right}`)
  get getLayoutRight() {
    return this.nmLayout == NmTabsLayoutEnum.Right;
  }
  @HostBinding(`class.${TabsPrefix}-${NmTabsLayoutEnum.Bottom}`)
  get getLayoutBottom() {
    return this.nmLayout == NmTabsLayoutEnum.Bottom;
  }
  @HostBinding(`class.${TabsPrefix}-${NmTabsLayoutEnum.Left}`)
  get getLayoutLeft() {
    return this.nmLayout == NmTabsLayoutEnum.Left;
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    fillDefault(this, this._default);
    this.setData();
  }

  ngAfterViewInit() {}

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
    if (this._data$) this._data$.unsubscribe();
  }

  activatedChange(activated: NmActivatedSlider) {
    this.nmActivatedIndex = activated.nmActivatedIndex;
  }

  private setData() {
    if (typeof this.nmData === "undefined") return;
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
    if (this.sliderOption.nmData instanceof BehaviorSubject)
      this.sliderOption.nmData.next(this.data);
    this.cdr.detectChanges();
  }

  private setSliderOption(value: NmSliderOption) {
    this.sliderOption = Object.assign(this.sliderOption, value);
  }
}
