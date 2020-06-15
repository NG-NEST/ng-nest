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
  Inject,
  SimpleChange
} from '@angular/core';
import { XTablePrefix, XTableProperty, XTableColumn, XTableAction } from './table.property';
import { XQuery, XIsUndefined, XIsEmpty, XResultList, XIsChange, XFilter, XResize, XIsObservable, XSetData } from '@ng-nest/ui/core';
import { Subject, fromEvent } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { first, find, filter, unionBy } from 'lodash';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { DOCUMENT } from '@angular/common';
import { XTableToolComponent } from './table-tool.component';
import { BlockScrollStrategy } from '@angular/cdk/overlay';

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
  @ViewChild('tool', { static: false }) tool: XTableToolComponent;
  @ViewChild('footer', { static: false }) footer: ElementRef;

  private _virtualBody: CdkVirtualScrollViewport;
  @ViewChild('virtualBody', { static: false })
  public get virtualBody(): CdkVirtualScrollViewport {
    return this._virtualBody;
  }
  public set virtualBody(value: CdkVirtualScrollViewport) {
    this._virtualBody = value;
  }
  tableData: any[] = [];
  groupData: any[] = [];
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

  scrollStrategy: BlockScrollStrategy;
  scrollContentEle: HTMLElement;
  hasScrollY = false;
  scrollYWidth = 0;
  hasScrollX = false;
  scrollXHeight = 0;
  scrollXWidth: number | null;
  scrollLeft = 0;
  scrollTop = 0;

  isEmpty = false;

  private _unSubject = new Subject<void>();
  private _isFirst = true;
  private _resizeObserver: ResizeObserver;
  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef, @Inject(DOCUMENT) public doc: any) {
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
    XIsChange(simples.data, simples.checkedRow) && this.setData();
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
    this.query.filter = unionBy([groupFilter], this.query.filter, (y) => y.field) as XFilter[];
    this.index = 1;
    this.indexChange.emit(this.index);
    this.setData();
  }

  rowOnClick(row: any, event?: Event) {
    row.event = event;
    this.activatedRow = row;
    this.rowEmit.emit(row);
    this.cdr.detectChanges();
  }

  getIndex(index: number) {
    return (Number(this.index) - 1) * Number(this.size) + index + 1;
  }

  getSticky(column: XTableColumn) {
    return Number(column.left) >= 0;
  }

  setActions() {
    if (typeof this.actions === 'undefined') return;
    this.rowIconActions = filter(this.actions, (x) => x.actionLayoutType === 'row-icon');
    this.activatedAction = find(this.actions, (x) => x.activated) as XTableAction;
    this.cdr.markForCheck();
  }

  setData(fst?: boolean) {
    if (this.service) {
      this.service.getList(Number(this.index), Number(this.size), this.query).subscribe((x) => {
        if (fst || (this._isFirst && this.firstRowSelected)) {
          let ft = first(x.list);
          if (ft) {
            this.rowOnClick(first(x.list));
            this._isFirst = false;
          }
        }
        this.setDataChange(x);
      });
    } else if (this.data) {
      this.setDataChange(this.data);
    } else {
      this.isEmpty = true;
    }
  }

  setSubject() {
    // console.log(this.virtualBody);
    if (this.virtualBody) {
      this.scrollContentEle = this.virtualBody?.elementRef?.nativeElement.querySelector(
        '.cdk-virtual-scroll-content-wrapper'
      ) as HTMLElement;
      // console.log(this.scrollContentEle);
      XResize(this.elementRef.nativeElement, this.scrollContentEle)
        .pipe(takeUntil(this._unSubject))
        .subscribe((x) => {
          this._resizeObserver = x.resizeObserver;
          this.setAdaptionHeight();
          this.setScroll();
        });
      fromEvent(window, 'resize')
        .pipe(takeUntil(this._unSubject))
        .subscribe(() => {
          this.setAdaptionHeight();
        });
    }
    if (this.scrollContentEle) {
      fromEvent(this.virtualBody.elementRef.nativeElement, 'scroll')
        .pipe(takeUntil(this._unSubject))
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
          this.indexChange.emit(this.index);
          this.setFilter(this.query, x);
          return service.getList(this.index, Number(this.size), this.query);
        }),
        takeUntil(this._unSubject)
      )
      .subscribe((x) => {
        this.setDataChange(x);
      });
  }

  setScroll() {
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

  setAdaptionHeight() {
    if (!XIsUndefined(this.adaptionHeight)) {
      const toolHeight = this.tool?.elementRef.nativeElement.clientHeight || 0;
      const headerHeight = this.header?.nativeElement.clientHeight || 0;
      const footerHeight = this.footer?.nativeElement.clientHeight || 0;
      this.bodyHeight =
        Number(this.docPercent) * this.doc.documentElement.clientHeight -
        toolHeight -
        headerHeight -
        footerHeight -
        Number(this.adaptionHeight);
      this.minBufferPx = this.bodyHeight;
      this.maxBufferPx = this.bodyHeight * 1.2;
      this.virtualBody['_scrollStrategy']['_minBufferPx'] = this.minBufferPx;
      this.virtualBody['_scrollStrategy']['_maxBufferPx'] = this.maxBufferPx;
      this.cdr.detectChanges();
    }
  }

  setDataChange(result: XResultList<any>) {
    this.total = result.total as number;
    this.setChecked(result.list);
    this.tableData = result.list as any[];
    this.isEmpty = this.tableData.length === 0;
    if (this.hasScrollY) this.virtualBody?.scrollTo({ top: 0 });
    if (this.hasScrollX) this.virtualBody?.scrollTo({ left: 0 });
    this.cdr.detectChanges();
  }

  setFilter(query: XQuery, value: string) {
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

  setChecked(list?: any[]) {
    if (XIsUndefined(list) || !this.checkedRow) return;
    for (let key in this.checkedRow) {
      const arr = this.checkedRow[key];
      for (let item of list as any[]) {
        item[key] = arr.includes(item.id);
      }
    }
  }
}
