import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  ContentChildren,
  ViewChild,
  ViewEncapsulation,
  SimpleChange,
  QueryList
} from '@angular/core';
import { XTabsPrefix, XTabsNode, XTabsProperty } from './tabs.property';
import { XIsChange, XSetData, XIsEmpty, XConfigService } from '@ng-nest/ui/core';
import { Subject } from 'rxjs';
import { XSliderComponent, XSliderProperty } from '@ng-nest/ui/slider';
import { XTabComponent } from './tab.component';

@Component({
  selector: `${XTabsPrefix}`,
  templateUrl: './tabs.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTabsComponent extends XTabsProperty implements OnInit, OnChanges {
  sliderOption = new XSliderProperty();
  tabs: XTabsNode[] = [];
  private _unSubject = new Subject<void>();

  get activeIndex() {
    return Number(this.activatedIndex);
  }

  @ContentChildren(XTabComponent) listTabs!: QueryList<XTabComponent>;

  @ViewChild(XSliderComponent, { static: false }) slider!: XSliderComponent;

  constructor(private cdr: ChangeDetectorRef, public configService: XConfigService) {
    super();
  }

  ngOnInit() {
    this.setClassMap();
    this.setSliderOption();
    this.setNodeJustify();
  }

  ngOnChanges(changes: SimpleChanges): void {
    XIsChange(changes.data) && this.setData();
    XIsChange(changes.layout) && this.setLayout(changes.layout);
    XIsChange(changes.justify) && this.cdr.detectChanges();
    XIsChange(changes.activatedIndex) && this.setActivatedIndex();
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  ngAfterViewInit() {
    this.setData();
  }

  activatedChange(index: number) {
    this.activatedIndex = index;
    this.indexChange.emit({
      activatedIndex: index,
      activatedTab: this.tabs[index]
    });
    this.setFirstAndLast();
    this.cdr.detectChanges();
  }

  setActivatedIndex() {
    if (typeof this.sliderOption === 'undefined') {
      this.sliderOption = new XSliderProperty();
    }
    this.sliderOption.activatedIndex = this.activatedIndex;
    this.setFirstAndLast();
    this.cdr.detectChanges();
  }

  private setClassMap() {
    this.classMap = {
      [`${XTabsPrefix}-${this.layout}`]: !XIsEmpty(this.layout),
      [`${XTabsPrefix}-${this.type}`]: !XIsEmpty(this.type)
    };
  }

  private setLayout(layout: SimpleChange) {
    this.classMap[`${XTabsPrefix}-${layout.previousValue}`] = false;
    this.classMap[`${XTabsPrefix}-${layout.currentValue}`] = true;
    this.setSliderOption();
    this.cdr.detectChanges();
  }

  private setNodeJustify() {
    this.nodeJustify = this.nodeJustify ? this.nodeJustify : this.layout === 'left' ? 'end' : this.layout === 'right' ? 'start' : 'center';
  }

  private setData() {
    if (XIsEmpty(this.data)) {
      if (this.listTabs && this.listTabs.length > 0) {
        let _data: any[] = [];
        this.listTabs.forEach((x, index) => {
          _data = [...(_data as XTabsNode[]), { id: index + 1, label: x.label }];
        });
        this.data = _data;
      } else {
        return;
      }
    }
    XSetData<XTabsNode>(this.data, this._unSubject).subscribe((x) => {
      this.tabs = x;
      if (!this.sliderHidden) {
        this.sliderHidden = this.tabs.length <= 1;
      }
      this.sliderOption.data = this.tabs;
      this.setFirstAndLast();
      this.cdr.detectChanges();
    });
  }

  private setSliderOption() {
    this.sliderOption.layout = ['top', 'bottom'].indexOf(this.layout) !== -1 ? 'row' : 'column';
  }

  private setFirstAndLast() {
    this.classMap[`${XTabsPrefix}-is-first`] = this.activatedIndex === 0;
    this.classMap[`${XTabsPrefix}-is-last`] = this.activatedIndex === this.tabs?.length - 1;
  }
}
