import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
  ViewChild,
  HostBinding,
  Inject
} from '@angular/core';
import { XTablePrefix, XTableProperty, XTableColumn, XTableAction } from './table.property';
import { XQuery, XIsUndefined, XIsEmpty, XResultList, XIsChange, XFilter, XResize } from '@ng-nest/ui/core';
import { Subject, fromEvent } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { inject } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { format } from 'path';

@Component({
  selector: `${XTablePrefix}`,
  templateUrl: './table.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTableComponent extends XTableProperty implements OnInit, OnChanges {
  @HostBinding('class.x-table-scroll-left') get getScrollLeft() {
    return this.scrollLeft > 0;
  }
  @HostBinding('class.x-table-scroll-top') get getScrollTop() {
    return this.scrollTop > 0;
  }
  @ViewChild('header', { static: false }) header: ElementRef;
  @ViewChild('headerRow', { static: false }) headerRow: ElementRef;
  @ViewChild('tool', { static: false }) tool: ElementRef;
  @ViewChild('footer', { static: false }) footer: ElementRef;
  @ViewChild('virtualBody', { static: false }) virtualBody: CdkVirtualScrollViewport;
  tableData: any[] = [];
  groupData: any[] = [];
  topLeftActions: XTableAction[] = [];
  topRightActions: XTableAction[] = [];
  topRightIconActions: XTableAction[] = [];
  rowIconActions: XTableAction[] = [];
  activatedAction: XTableAction;
  groupIndex: number = 1;
  groupSize: number = 10;
  groupTotal: number = 0;
  groupQuery: XQuery = {};
  groupColumns: XTableColumn[] = [];
  groupActivatedRow: any;
  groupSearchPlaceholder: string;
  groupSearchSerialNumberHidden = true;
  searchInput: any;
  searchSub = new Subject<string>();
  sortStr = '';

  scrollContentEle: HTMLElement;
  hasScrollY = false;
  scrollYWidth = 0;
  hasScrollX = false;
  scrollXHeight = 0;
  scrollXWidth: number | null;
  scrollLeft = 0;
  scrollTop = 0;

  private _unSubject = new Subject<void>();
  private _isFirst = true;
  private _resizeObserver: ResizeObserver;
  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private doc: Document
  ) {
    super();
    this.renderer.addClass(this.elementRef.nativeElement, XTablePrefix);
  }

  ngOnInit() {
    this.setActions();
    this.setData();
  }

  ngAfterViewInit() {
    this.setSubject();
  }

  ngOnChanges(simples: SimpleChanges) {
    XIsChange(simples.rowPrimary) && this.setData(true);
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
    this._resizeObserver?.disconnect();
  }

  change(index: number) {
    this.index = index;
    this.indexChange.emit(index);
    this.setData();
  }

  searchChange(event: any) {
    if (XIsUndefined(event)) return;
    this.searchSub.next(event);
  }

  onSort(column: XTableColumn) {
    if (!column.sort) return;
    if (XIsEmpty(this.query.sort)) this.query.sort = [];
    let sort = this.query.sort?.find((y) => y.field === column.id);
    if (sort) {
      if (sort.value === 'asc') {
        this.query.sort = [];
        this.sortStr = '';
      } else {
        sort.value = 'asc';
      }
    } else {
      sort = { field: column.id, value: 'desc' };
      this.query.sort = [sort];
    }
    if (!XIsEmpty(this.query.sort)) this.sortStr = `${sort.field} ${sort.value}`;
    this.setData();
  }

  groupRowClick(row: any) {
    if (XIsEmpty(this.query.filter)) this.query.filter = [];
    let groupFilter = {
      field: this.groupQuery.group,
      value: row[this.groupQuery.group as string]
    };
    this.query.filter = _.unionBy([groupFilter], this.query.filter, (y) => y.field) as XFilter[];
    this.index = 1;
    this.setData();
  }

  actionEmit(action: XTableAction, event: Event) {
    action.event = event;
    if (action.actionLayoutType === 'top-right-icon') {
      this.activatedAction.activated = false;
      action.activated = true;
      this.activatedAction = action;
      if (action.group) {
        _.remove(this.query.filter as XFilter[], (x) => x.field === this.groupQuery.group);
        this.groupQuery.filter = [];
        this.groupIndex = 1;
        this.groupQuery.group = action.group;
        this.groupQuery.sort = [{ field: 'count', value: 'desc' }];
        let groupColumn = _.cloneDeep(this.columns?.find((x) => x.id === action.group));
        if (groupColumn) {
          groupColumn.flex = 4;
          groupColumn.search = true;
          this.groupSearchPlaceholder = `查找${groupColumn.label}`;
          this.groupColumns = [groupColumn, { id: 'count', flex: 2 }];
        }
        this.cdr.detectChanges();
      } else if (this.groupQuery.group) {
        _.remove(this.query.filter as XFilter[], (x) => x.field === this.groupQuery.group);
        this.groupQuery.group = undefined;
        this.groupQuery.filter = [];
        this.setData();
      }
    }

    this.actionClick.emit(action);
  }

  rowEmit(row: any, event?: Event) {
    row.event = event;
    this.activatedRow = row;
    this.rowClick.emit(row);
    this.cdr.detectChanges();
  }

  getIndex(index: number) {
    return (Number(this.index) - 1) * Number(this.size) + index + 1;
  }

  getSticky(column: XTableColumn) {
    return Number(column.left) >= 0;
  }

  private setActions() {
    if (typeof this.actions === 'undefined') return;
    this.topLeftActions = _.filter(this.actions, (x) => typeof x.actionLayoutType === 'undefined' || x.actionLayoutType === 'top-left');
    this.topRightActions = _.filter(this.actions, (x) => x.actionLayoutType === 'top-right');
    this.topRightIconActions = _.filter(this.actions, (x) => x.actionLayoutType === 'top-right-icon');
    this.rowIconActions = _.filter(this.actions, (x) => x.actionLayoutType === 'row-icon');
    this.activatedAction = _.find(this.actions, (x) => x.activated) as XTableAction;
    this.cdr.markForCheck();
  }

  private setData(first?: boolean) {
    if (this.service) {
      this.service.getList(Number(this.index), Number(this.size), this.query).subscribe((x) => {
        if (first || (this._isFirst && this.firstRowSelected)) {
          let ft = _.first(x.list);
          if (ft) {
            this.rowEmit(_.first(x.list));
            this._isFirst = false;
          }
        }
        this.setDataChange(x);
      });
    }
  }

  private setSubject() {
    this.scrollContentEle = this.virtualBody?.elementRef?.nativeElement.querySelector('.cdk-virtual-scroll-content-wrapper') as HTMLElement;
    XResize(this.elementRef.nativeElement, this.scrollContentEle)
      .pipe(debounceTime(10), takeUntil(this._unSubject))
      .subscribe((x) => {
        this._resizeObserver = x.resizeObserver;
        this.setAdaptionHeight();
        this.setScroll();
      });
    fromEvent(window, 'resize')
      .pipe(debounceTime(10), takeUntil(this._unSubject))
      .subscribe((x) => {
        this.setAdaptionHeight();
      });
    if (this.scrollContentEle) {
      fromEvent(this.virtualBody.elementRef.nativeElement, 'scroll')
        .pipe(debounceTime(10), takeUntil(this._unSubject))
        .subscribe((x) => {
          const ele = x.srcElement as HTMLElement;
          this.scrollTop = ele.scrollTop;
          this.scrollLeft = ele.scrollLeft;
          if (ele.scrollLeft >= 0) {
            this.header.nativeElement.scrollLeft = this.scrollLeft;
          }
        });
    }
    if (!this.service) return;
    const service = this.service;
    this.searchSub
      .asObservable()
      .pipe(
        debounceTime(200),
        switchMap((x: string) => {
          this.index = 1;
          this.setFilter(this.query, x);
          return service.getList(this.index, Number(this.size), this.query);
        }),
        takeUntil(this._unSubject)
      )
      .subscribe((x) => {
        this.setDataChange(x);
      });
  }

  private setScroll() {
    if (!this.virtualBody) return;
    const ele = this.virtualBody.elementRef.nativeElement;
    const hasY = ele.scrollHeight > this.bodyHeight;
    const hasX = this.scrollContentEle.clientWidth > ele.clientWidth;

    if (!this.hasScrollY && hasY) {
      this.hasScrollY = true;
      this.scrollYWidth = ele.offsetWidth - ele.clientWidth;
    } else if (this.hasScrollY && !hasY) {
      this.hasScrollY = false;
      this.scrollYWidth = 0;
    }

    if (!this.hasScrollX && hasX) {
      this.hasScrollX = true;
      this.scrollXHeight = ele.offsetHeight - ele.clientHeight;
    } else if (this.hasScrollX && !hasX) {
      this.hasScrollX = false;
      this.scrollXHeight = 0;
      this.scrollXWidth = null;
    }
    if (hasX) {
      this.scrollXWidth = ele.offsetWidth + ele.scrollWidth - ele.clientWidth;
    }
    this.cdr.detectChanges();
  }

  private setAdaptionHeight() {
    if (!XIsUndefined(this.adaptionHeight)) {
      const toolHeight = this.tool?.nativeElement.clientHeight;
      const headerHeight = this.header?.nativeElement.clientHeight;
      const footerHeight = this.footer?.nativeElement.clientHeight;
      this.bodyHeight =
        Number(this.docPercent) * this.doc.documentElement.clientHeight -
        toolHeight -
        headerHeight -
        footerHeight -
        Number(this.adaptionHeight);
      console.log(this.bodyHeight);
      this.minBufferPx = this.bodyHeight;
      this.maxBufferPx = this.bodyHeight * 1.2;
      this.virtualBody['_scrollStrategy']['_minBufferPx'] = this.minBufferPx;
      this.virtualBody['_scrollStrategy']['_maxBufferPx'] = this.maxBufferPx;
      this.cdr.detectChanges();
    }
  }

  private setDataChange(result: XResultList<any>) {
    this.total = result.total as number;
    this.tableData = result.list as any[];
    if (this.hasScrollY) this.virtualBody?.scrollTo({ top: 0 });
    if (this.hasScrollX) this.virtualBody?.scrollTo({ left: 0 });
    this.cdr.detectChanges();
  }

  private setFilter(query: XQuery, value: string) {
    let searchColumns = this.columns.filter((x) => x.search);
    if (XIsEmpty(query.filter)) query.filter = [];
    searchColumns.forEach((x) => {
      let ft = query.filter?.find((y) => y.field === x.id);
      if (ft) {
        ft.value = value;
      } else {
        query.filter = [...(query.filter as XFilter[]), { field: x.id, value: value }];
      }
    });
  }
}
