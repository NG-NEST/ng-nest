import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { XTablePrefix, XTableProperty, XTableColumn, XTableRow } from './table.property';
import { XIsChange, XIsEmpty, XResultList, XNumber, XSort, XConfigService } from '@ng-nest/ui/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { XPaginationComponent } from '@ng-nest/ui/pagination';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: `${XTablePrefix}`,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTableComponent extends XTableProperty implements OnInit, OnDestroy {
  get getScrollLeft() {
    return this.scrollLeft > 0;
  }
  get getScrollTop() {
    return this.scrollTop > 0;
  }
  thead: ElementRef;
  tfoot: ElementRef;
  virtualBody: CdkVirtualScrollViewport;
  bodyChange: Function;
  scrollContentEle: HTMLElement;
  hasScrollY = false;
  scrollYWidth = 0;
  hasScrollX = false;
  scrollXHeight = 0;
  scrollXWidth: number | null;
  scrollLeft = 0;
  scrollTop = 0;
  rowChecked: XTableColumn;
  dataIsFunc = false;
  getting = false;
  tableData: XTableRow[] = [];
  @ViewChild('table') table: ElementRef;
  @ViewChild('pagination') pagination: XPaginationComponent;
  private _unSubject = new Subject();
  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    public configService: XConfigService
  ) {
    super();
  }

  ngOnInit() {
    this.setRowChecked();
  }

  ngOnChanges(simples: SimpleChanges) {
    XIsChange(simples.data, simples.checkedRow) && this.setData();
    XIsChange(simples.columns, simples.activatedRow) && this.cdr.detectChanges();
    XIsChange(simples.manual) && this.setManual();
  }

  ngOnDestroy() {
    this._unSubject.next();
    this._unSubject.complete();
  }

  getSticky(column: XTableColumn) {
    return Number(column.left) >= 0;
  }

  getIndex(index: number) {
    return (Number(this.index) - 1) * Number(this.size) + index + 1;
  }

  setData() {
    if (Array.isArray(this.data)) {
      this.dataIsFunc = false;
      this.tableData = this.data;
      this.setChecked();
    } else if (this.data instanceof Function) {
      this.dataIsFunc = true;
      this.getDataByFunc();
    }
  }

  getDataByFunc() {
    if (!this.manual) return;
    this.getting = true;
    this.cdr.detectChanges();
    this._unSubject.next();
    (this.data as Function)(this.index, this.size, this.query)
      .pipe(takeUntil(this._unSubject))
      .subscribe((x: XResultList<XTableRow>) => {
        [this.tableData, this.total] = [x.list as XTableRow[], x.total as XNumber];
        if (this.virtualBody) {
          this.virtualBody.scrollToIndex(0);
          this.virtualBody.checkViewportSize();
        }
        this.getting = false;
        this.setChecked();
        this.bodyChange && this.bodyChange();
        this.cdr.detectChanges();
      });
  }

  setManual() {
    if (this.dataIsFunc) this.getDataByFunc();
  }

  setRowChecked() {
    this.rowChecked = this.columns.find((x) => x.rowChecked) as XTableColumn;
  }

  change(index: number) {
    this.index = index;
    this.dataIsFunc && this.getDataByFunc();
    this.indexChange.emit(index);
    this.resetScroll();
  }

  resetScroll(x = true, y = true) {
    if (this.hasScrollX && x) this.virtualBody?.scrollTo({ left: 0 });
    if (this.hasScrollY && y) this.virtualBody?.scrollTo({ top: 0 });
  }

  setChecked() {
    let result: XTableRow[] = [];
    if (XIsEmpty(this.tableData) || !this.checkedRow) return;
    for (let key in this.checkedRow) {
      const arr = this.checkedRow[key];
      for (let item of this.tableData as any[]) {
        item[key] = arr.includes(item.id);
        result = [...result, item];
      }
    }
    if (result.length > 0) this.tableData = [...result];
    this.cdr.detectChanges();
  }

  checkSort(sort: XSort[]) {
    if (!this.dataIsFunc) return;
    if (typeof this.query === 'undefined') this.query = {};
    this.query.sort = sort;
    this.queryChange.emit(this.query);
    this.getDataByFunc();
  }
}
