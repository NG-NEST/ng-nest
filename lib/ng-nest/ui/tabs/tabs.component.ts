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
  ViewEncapsulation,
  QueryList
} from '@angular/core';
import { TabsPrefix, XTabsInput, XTabsNode, XActivatedTab } from './tabs.type';
import { fillDefault, XData, XInputBoolean } from '@ng-nest/ui/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { XSliderNode, XActivatedSlider, XSliderInput, XSliderComponent } from '@ng-nest/ui/slider';
import { XTabComponent } from './tab.component';

@Component({
  selector: 'x-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./style/index.scss'],
  // Todo: 使用 ShadowDom 模式后，模板中使用 ng-content 里面的内容无法显示
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTabsComponent implements OnInit, OnChanges {
  @Input() data?: XData<XTabsNode[]>;
  @Input() @XInputBoolean() animated: boolean = true;

  private _layout?: any;
  public get layout(): any {
    return this._layout;
  }
  @Input()
  public set layout(value: any) {
    this._layout = value;
    if (this._layout === 'top') {
      this.setSliderOption({
        layout: 'row',
        borderPosition: 'bottom'
      });
    } else if (this._layout === 'right') {
      this.setSliderOption({
        layout: 'column',
        borderPosition: 'left'
      });
    } else if (this._layout === 'bottom') {
      this.setSliderOption({
        layout: 'row',
        borderPosition: 'top'
      });
    } else if (this._layout === 'left') {
      this.setSliderOption({
        layout: 'column',
        borderPosition: 'right'
      });
    }
    this.cdr.detectChanges();
  }

  private _activatedIndex: number;
  public get activatedIndex(): number {
    return this._activatedIndex;
  }
  @Input()
  public set activatedIndex(value: number) {
    this._activatedIndex = value;
    this.sliderOption.activatedIndex = value;
    this.cdr.detectChanges();
  }

  sliderOption: XSliderInput = {
    data: new BehaviorSubject<XSliderNode[]>([]),
    layout: 'row',
    activatedIndex: 0,
    borderPosition: 'bottom'
  };
  sliderHidden: boolean = false;
  tabs: XTabsNode[] = [];
  @Output() indexChange?: EventEmitter<XActivatedTab> = new EventEmitter<XActivatedTab>();
  private _default: XTabsInput = {
    layout: 'top',
    activatedIndex: 0
  };

  private _data$: Subscription | null = null;

  @ContentChildren(XTabComponent) listTabs: Array<XTabComponent>;

  @ViewChild(XSliderComponent, { static: false }) slider: XSliderComponent;

  @HostBinding(`class.x-tabs-top`)
  get getLayoutTop() {
    return this.layout === 'top';
  }
  @HostBinding(`class.x-tabs-right`)
  get getLayoutRight() {
    return this.layout === 'right';
  }
  @HostBinding(`class.x-tabs-bottom`)
  get getLayoutBottom() {
    return this.layout === 'bottom';
  }
  @HostBinding(`class.x-tabs-left`)
  get getLayoutLeft() {
    return this.layout === 'left';
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private cdr: ChangeDetectorRef) {
    this.renderer.addClass(this.elementRef.nativeElement, TabsPrefix);
  }

  ngOnInit() {
    fillDefault(this, this._default);
  }

  ngAfterViewInit() {
    this.setData();
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

  private removeListen() {
    if (this._data$) {
      this._data$.unsubscribe();
    }
  }

  activatedChange(activated: XActivatedSlider) {
    this.activatedIndex = activated.activatedIndex;
    this.indexChange.emit({
      activatedIndex: activated.activatedIndex,
      activatedTab: activated.activatedSlider
    });
  }

  private setData() {
    if (typeof this.data === 'undefined') {
      if (this.listTabs && this.listTabs.length > 0) {
        let _data = [];
        this.listTabs.forEach((x, index) => {
          _data = [...(_data as XTabsNode[]), { id: index + 1, label: x.label }];
        });
        this.data = _data;
      } else {
        return;
      }
    }
    if (this.data instanceof Array) {
      this.setDataChange(this.data);
    } else if (this.data instanceof BehaviorSubject) {
      if (this._data$) this._data$.unsubscribe();
      this._data$ = this.data.subscribe(x => {
        this.setDataChange(x);
      });
    } else if (this.data instanceof Observable) {
      if (this._data$) this._data$.unsubscribe();
      this._data$ = this.data.subscribe(x => {
        this.setDataChange(x);
      });
    }
  }

  private setDataChange(value: XSliderNode[]) {
    this.tabs = value;
    if (this.sliderOption.data instanceof BehaviorSubject) {
      this.sliderHidden = this.tabs.length <= 1;
      this.sliderOption.data.next(this.tabs);
    }
    this.cdr.detectChanges();
  }

  private setSliderOption(value: XSliderInput) {
    Object.assign(this.sliderOption, value);
  }
}
