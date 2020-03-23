import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
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
  TemplateRef
} from '@angular/core';
import { XTabsPrefix, XTabsNode, XActivatedTab, XTabsLayoutType, XTabsType } from './tabs.type';
import { XData, XInputBoolean, XJustify, XClassMap } from '@ng-nest/ui/core';
import { BehaviorSubject, Observable, Subscription, Subject } from 'rxjs';
import { XSliderNode, XSliderInput, XSliderComponent } from '@ng-nest/ui/slider';
import { XTabComponent } from './tab.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: `${XTabsPrefix}`,
  templateUrl: './tabs.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTabsComponent implements OnInit, OnChanges {
  @Input() data?: XData<XTabsNode[]>;
  @Input() justify: XJustify = 'start';
  @Input() type?: XTabsType;
  @Input() @XInputBoolean() animated: boolean = true;
  @Input() nodeTpl: TemplateRef<any>;

  @Input() layout: XTabsLayoutType = 'top';

  private _activatedIndex: number = 0;
  public get activatedIndex(): number {
    return this._activatedIndex;
  }
  @Input()
  public set activatedIndex(value: number) {
    this._activatedIndex = value;
    this.sliderOption.activatedIndex = value;
    this.cdr.detectChanges();
  }
  @Output() indexChange?: EventEmitter<XActivatedTab> = new EventEmitter<XActivatedTab>();

  sliderOption: XSliderInput = {
    data: [],
    layout: 'row',
    activatedIndex: 0
  };
  sliderHidden: boolean = false;
  tabs: XTabsNode[] = [];
  classMap: XClassMap = {};
  private unSubject = new Subject();

  @ContentChildren(XTabComponent) listTabs: Array<XTabComponent>;

  @ViewChild(XSliderComponent, { static: false }) slider: XSliderComponent;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.setClassMap();
    this.setSliderOption();
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
    this.unSubject.next();
    this.unSubject.unsubscribe();
  }

  activatedChange(index: number) {
    this.activatedIndex = index;
    this.indexChange.emit({
      activatedIndex: index,
      activatedTab: this.tabs[index]
    });
  }

  private setClassMap() {
    this.classMap[`${XTabsPrefix}-${this.layout}`] = this.layout ? true : false;
    this.classMap[`${XTabsPrefix}-${this.type}`] = this.type ? true : false;
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
    } else if (this.data instanceof BehaviorSubject || this.data instanceof Observable) {
      this.data.pipe(takeUntil(this.unSubject)).subscribe(x => {
        this.setDataChange(x);
      });
    }
  }

  private setDataChange(value: XSliderNode[]) {
    this.tabs = value;
    this.sliderHidden = this.tabs.length <= 1;
    this.sliderOption.data = this.tabs;
    this.cdr.detectChanges();
  }

  private setSliderOption() {
    this.sliderOption.layout = ['top', 'bottom'].indexOf(this.layout) !== -1 ? 'row' : 'column';
  }
}
