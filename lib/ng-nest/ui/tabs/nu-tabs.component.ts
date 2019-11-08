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
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import {
  TabsPrefix,
  NuTabsOption,
  NuTabsNode,
  NuActivatedTab
} from "./nu-tabs.type";
import { fillDefault, NuData } from "@ng-nest/ui/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import {
  NuSliderNode,
  NuActivatedSlider,
  NuSliderOption,
  NuSliderComponent
} from "@ng-nest/ui/slider";
import { NuTabComponent } from "./nu-tab.component";

@Component({
  selector: "nu-tabs",
  templateUrl: "./nu-tabs.component.html",
  styleUrls: ["./style/index.scss"],
  // Todo: 使用 ShadowDom 模式后，模板中使用 ng-content 里面的内容无法显示
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NuTabsComponent implements OnInit, OnChanges {
  @Input() nuData?: NuData<NuTabsNode[]>;

  private _nuLayout?: any;
  public get nuLayout(): any {
    return this._nuLayout;
  }
  @Input()
  public set nuLayout(value: any) {
    this._nuLayout = value;
    if (this._nuLayout === "top") {
      this.setSliderOption({
        nuLayout: "row",
        nuBorderPosition: "bottom"
      });
    } else if (this._nuLayout === "right") {
      this.setSliderOption({
        nuLayout: "column",
        nuBorderPosition: "left"
      });
    } else if (this._nuLayout === "bottom") {
      this.setSliderOption({
        nuLayout: "row",
        nuBorderPosition: "top"
      });
    } else if (this._nuLayout === "left") {
      this.setSliderOption({
        nuLayout: "column",
        nuBorderPosition: "right"
      });
    }
    this.cdr.detectChanges();
  }

  private _nuActivatedIndex: number;
  public get nuActivatedIndex(): number {
    return this._nuActivatedIndex;
  }
  @Input()
  public set nuActivatedIndex(value: number) {
    this._nuActivatedIndex = value;
    this.sliderOption.nuActivatedIndex = value;
    this.cdr.detectChanges();
  }

  sliderOption: NuSliderOption = {
    nuData: new BehaviorSubject<NuSliderNode[]>([]),
    nuLayout: "row",
    nuActivatedIndex: 0,
    nuBorderPosition: "bottom"
  };
  sliderHidden: boolean = false;
  data: NuTabsNode[] = [];
  @Output() nuActivatedChange?: EventEmitter<NuActivatedTab> = new EventEmitter<
    NuActivatedTab
  >();
  private _default: NuTabsOption = {
    nuLayout: "top",
    nuActivatedIndex: 0
  };

  private _data$: Subscription | null = null;

  @ContentChildren(NuTabComponent) listTabs: Array<NuTabComponent>;

  @ViewChild(NuSliderComponent, { static: false }) slider: NuSliderComponent;

  @HostBinding(`class.nu-tabs-top`)
  get getLayoutTop() {
    return this.nuLayout === "top";
  }
  @HostBinding(`class.nu-tabs-right`)
  get getLayoutRight() {
    return this.nuLayout === "right";
  }
  @HostBinding(`class.nu-tabs-bottom`)
  get getLayoutBottom() {
    return this.nuLayout === "bottom";
  }
  @HostBinding(`class.nu-tabs-left`)
  get getLayoutLeft() {
    return this.nuLayout === "left";
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

  private removeListen() {
    if (this._data$) {
      this._data$.unsubscribe();
    }
  }

  activatedChange(activated: NuActivatedSlider) {
    this.nuActivatedIndex = activated.nuActivatedIndex;
    this.nuActivatedChange.emit({
      nuActivatedIndex: activated.nuActivatedIndex,
      nuActivatedTab: activated.nuActivatedSlider
    });
  }

  private setData() {
    if (typeof this.nuData === "undefined") {
      if (this.listTabs && this.listTabs.length > 0) {
        this.nuData = [];
        this.listTabs.forEach((x, index) => {
          this.nuData = [
            ...(this.nuData as NuTabsNode[]),
            { nuKey: index + 1, nuLabel: x.nuLabel }
          ];
        });
      } else {
        return;
      }
    }
    if (this.nuData instanceof Array) {
      this.setDataChange(this.nuData);
    } else if (this.nuData instanceof BehaviorSubject) {
      if (this._data$) this._data$.unsubscribe();
      this._data$ = this.nuData.subscribe(x => {
        this.setDataChange(x);
      });
    } else if (this.nuData instanceof Observable) {
      if (this._data$) this._data$.unsubscribe();
      this._data$ = this.nuData.subscribe(x => {
        this.setDataChange(x);
      });
    }
  }

  private setDataChange(value: NuSliderNode[]) {
    this.data = value;
    if (this.sliderOption.nuData instanceof BehaviorSubject) {
      this.sliderHidden = this.data.length <= 1;
      this.sliderOption.nuData.next(this.data);
    }
    this.cdr.detectChanges();
  }

  private setSliderOption(value: NuSliderOption) {
    Object.assign(this.sliderOption, value);
  }
}
