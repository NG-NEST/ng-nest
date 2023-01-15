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
  QueryList,
  ElementRef,
  Renderer2,
  Optional
} from '@angular/core';
import { XTabsPrefix, XTabsNode, XTabsProperty } from './tabs.property';
import { XIsChange, XSetData, XIsEmpty, XConfigService, XResize } from '@ng-nest/ui/core';
import { Subject, takeUntil, distinctUntilChanged, filter, startWith, delay } from 'rxjs';
import { XSliderComponent, XSliderProperty } from '@ng-nest/ui/slider';
import { XTabComponent } from './tab.component';
import { NavigationEnd, Router, RouterLink } from '@angular/router';

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
  private _tabsContentChange = new Subject<string>();
  private _resizeObserver!: ResizeObserver;

  get activeIndex() {
    return Number(this.activatedIndex);
  }

  @ContentChildren(XTabComponent) listTabs!: QueryList<XTabComponent>;

  @ViewChild(XSliderComponent) slider!: XSliderComponent;
  @ViewChild('actionsRef') actionsRef!: ElementRef<HTMLElement>;

  constructor(
    private cdr: ChangeDetectorRef,
    public configService: XConfigService,
    public renderer: Renderer2,
    @Optional() private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.setClassMap();
    this.setSliderOption();
    this.setNodeJustify();
    this.setSubject();
    this.setData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { data, layout, justify, activatedIndex } = changes;
    XIsChange(data) && this.setData();
    XIsChange(layout) && this.setLayout(layout);
    XIsChange(justify) && this.cdr.detectChanges();
    XIsChange(activatedIndex) && this.setActivatedIndex();
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
    this._resizeObserver?.disconnect();
  }

  ngAfterContentChecked(): void {
    if (this.tabs.length !== this.listTabs.length) {
      this._tabsContentChange.next(`${this.tabs.length}-${this.listTabs.length}`);
    }
  }

  ngAfterViewInit() {
    this.setSliderWidth();
    Promise.resolve().then(() => {
      this.setRouter();
    });
  }

  setSliderWidth() {
    if (this.slider && this.actionsRef) {
      XResize(this.actionsRef.nativeElement)
        .pipe(takeUntil(this._unSubject))
        .subscribe((x) => {
          this._resizeObserver = x.resizeObserver;
          this.renderer.setStyle(
            this.slider.elementRef.nativeElement,
            'width',
            `calc(100% - ${this.actionsRef.nativeElement.clientWidth}px)`
          );
        });
    }
  }

  setSubject() {
    this._tabsContentChange.pipe(distinctUntilChanged(), takeUntil(this._unSubject)).subscribe(() => {
      this.setData();
    });
  }

  setRouter() {
    if (!this.linkRouter) return;
    if (!this.router) {
      console.warn(`${XTabsPrefix}: you should import 'RouterModule' if you want to use 'linkRouter'!`);
      return;
    }
    this.router.events
      .pipe(
        filter((x) => x instanceof NavigationEnd),
        startWith(true),
        delay(0),
        takeUntil(this._unSubject)
      )
      .subscribe(() => {
        this.updateRouterActive();
        this.cdr.markForCheck();
      });
  }

  updateRouterActive() {
    if (!this.router.navigated) return;
    const index = this.findShouldActiveTabIndex();
    if (index !== -1 && index !== this.activeIndex) {
      this.activatedIndex = index;
      this.setActivatedIndex();
    }
  }

  findShouldActiveTabIndex(): number {
    const tabs = this.listTabs.toArray();
    const isActive = this.isLinkActive(this.router);

    return tabs.findIndex((tab) => {
      const c = tab.linkDirective;
      return c ? isActive(c.routerLink) || isActive(c.routerLinkWithHref) : false;
    });
  }

  isLinkActive(router: Router): (link?: RouterLink | RouterLink) => boolean {
    return (link?: RouterLink | RouterLink) => {
      return link ? router.isActive(link.urlTree!, Boolean(this.linkExact)) : false;
    };
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
    let data = [];
    if (XIsEmpty(this.data)) {
      if (this.listTabs && this.listTabs.length > 0) {
        let _data: any[] = [];
        this.listTabs.forEach((x, index) => {
          const label = x.linkTemplateDirective?.templateRef || x.label;
          const id = x.label || index;
          _data = [...(_data as XTabsNode[]), { id: id, label: label, disabled: x.disabled }];
        });
        data = _data;
      } else {
        data = [];

        return;
      }
    }
    XSetData<XTabsNode>(data, this._unSubject).subscribe((x) => {
      this.tabs = x;
      if (!this.sliderHidden && !this.actionTpl) {
        this.sliderHidden = this.tabs.length <= 1;
      }
      this.sliderOption.data = this.tabs;
      this.setActivatedIndex();
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
