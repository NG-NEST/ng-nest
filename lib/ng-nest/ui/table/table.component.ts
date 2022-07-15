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
import { XTablePrefix, XTableProperty, XTableColumn, XTableRow, XTableCell, XTableCellConfigRule } from './table.property';
import { XIsChange, XIsEmpty, XResultList, XNumber, XSort, XConfigService, XIsUndefined } from '@ng-nest/ui/core';
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
  get getRowHeight() {
    return this.rowHeight == 0 ? '' : this.rowHeight;
  }
  get getStickyScrollTop() {
    return this.tcaption ? this.tcaption.nativeElement.offsetHeight : 0;
  }
  tcaption!: ElementRef;
  thead!: ElementRef;
  tfoot!: ElementRef;
  virtualBody!: CdkVirtualScrollViewport;
  headChange!: () => void;
  bodyChange!: () => void;
  scrollContentEle!: HTMLElement;
  hasScrollY = false;
  scrollYWidth = 0;
  hasScrollX = false;
  scrollXHeight = 0;
  scrollXWidth!: number | null;
  scrollLeft = 0;
  scrollLeftMax = false;
  scrollTop = 0;
  rowChecked!: XTableColumn;
  headCheckboxList!: XTableColumn[];
  rowExpand!: XTableColumn;
  headExpandList!: XTableColumn[];
  dataIsFunc = false;
  getting = false;
  tableData: XTableRow[] = [];
  treeTableData: XTableRow[] = [];
  checkedValues: { [prop: string]: boolean } = {};
  indeterminate = '$$indeterminate';
  @ViewChild('table') table!: ElementRef;
  @ViewChild('caption') caption!: ElementRef;
  @ViewChild('pagination') pagination!: XPaginationComponent;
  private _unSubject = new Subject<void>();
  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    public configService: XConfigService
  ) {
    super();
  }

  ngOnInit() {
    this.setClassMap();
    this.setRowChecked();
    this.setRowExpand();
    this.setMerge();
    this.setPaginationPosition();
  }

  ngOnChanges(simples: SimpleChanges) {
    const { data, checkedRow, columns, activatedRow, manual, showPagination, expandedAll } = simples;
    XIsChange(expandedAll) && this.setExpandedAll();
    XIsChange(data, checkedRow) && this.setData();
    XIsChange(columns, activatedRow, showPagination) && this.cdr.detectChanges();
    XIsChange(manual) && this.setManual();
  }

  ngOnDestroy() {
    this._unSubject.next();
    this._unSubject.complete();
  }

  ngAfterViewInit() {
    this.tcaption = this.caption;
  }

  setClassMap() {
    this.classMap = {
      [`${XTablePrefix}-row-size-${this.rowSize}`]: !XIsEmpty(this.rowSize)
    };
    this.cdr.detectChanges();
  }

  setPaginationPosition() {
    this.renderer.addClass(this.elementRef.nativeElement, `x-table-${this.paginationPosition}`);
  }

  getStickyLeft(column: XTableColumn | XTableCell) {
    return Number(column.left) >= 0;
  }

  getStickyLeftLast(column: XTableColumn | XTableCell) {
    let lefts = this.columns.filter((x) => Number(x.left) >= 0);
    if (lefts.length === 0) return false;
    return lefts[lefts.length - 1].id === column.id;
  }

  getStickyRight(column: XTableColumn | XTableCell) {
    return Number(column.right) >= 0;
  }

  getStickyRightFirst(column: XTableColumn | XTableCell) {
    let rights = this.columns.filter((x) => Number(x.right) >= 0);
    if (rights.length === 0) return false;
    return rights[0].id === column.id;
  }

  hasStickyRight() {
    return this.columns.some((x) => Number(x.right) >= 0);
  }

  getIndex(index: number) {
    return (Number(this.index) - 1) * Number(this.size) + index + 1;
  }

  setData() {
    if (Array.isArray(this.data)) {
      this.dataIsFunc = false;
      this.setChecked(this.data);
      this.setHeadCheckboxList(this.data);
      this.setExpand(this.data);
      this.setHeadExpandList();
      this.tableData = this.data;
      this.detectChanges();
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
        let [data, total] = [x.list as XTableRow[], x.total as XNumber];
        if (this.virtualBody) {
          this.virtualBody.scrollToIndex(0);
          this.virtualBody.checkViewportSize();
        }
        this.getting = false;
        this.setChecked(data);
        this.setHeadCheckboxList(data);
        this.setExpand(data);
        this.setHeadExpandList();
        this.tableData = data;
        this.total = total;
        this.detectChanges();
      });
  }

  setManual() {
    if (this.dataIsFunc) this.getDataByFunc();
  }

  setRowChecked() {
    this.rowChecked = this.columns.find((x) => x.rowChecked) as XTableColumn;
    this.headCheckboxList = this.columns.filter((x) => x.type === 'checkbox' && x.headChecked);
  }

  setRowExpand() {
    this.rowExpand = this.columns.find((x) => x.rowExpand) as XTableColumn;
  }

  isExpandColumn(column: XTableColumn) {
    let expandColumn = this.columns.find((x) => x.id === column.id && x.type === 'expand');
    if (expandColumn) {
      return true;
    }
    return false;
  }

  setMerge() {
    if (!this.cellConfig) return;
    const setRule = (rule?: XTableCellConfigRule) => {
      if (!rule) return;
      let gridTemplateColumns = '',
        cells = [];
      if (!rule.gridTemplateColumns) {
        gridTemplateColumns = `${this.columns
          .map((x) => {
            if (x.width) return x.width;
            if (x.flex) return `${x.flex}fr`;
            return '1fr';
          })
          .join(' ')}`;
      }
      if (!rule.cells) return;
      cells = rule.cells.map((y) => {
        const col = this.columns.find((z) => z.id === y.id);
        if (col) {
          return { ...col, ...y } as XTableCell;
        }
        return y;
      });
      return { gridTemplateColumns, cells };
    };
    this.cellConfig.thead = setRule(this.cellConfig.thead);
    this.cellConfig.tbody = setRule(this.cellConfig.tbody);
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

  setChecked(data: XTableRow[]) {
    let result: XTableRow[] = [];
    if (XIsEmpty(data) || !this.checkedRow) return;
    for (let key in this.checkedRow) {
      const arr = this.checkedRow[key];
      for (let item of data as any[]) {
        item[key] = arr.includes(item.id);
        result = [...result, item];
      }
    }
    if (result.length > 0) data = [...result];
  }

  setHeadCheckboxList(data: XTableRow[]) {
    if (XIsEmpty(data) || !this.headCheckboxList) return;
    for (let column of this.headCheckboxList) {
      this.setCheckedValues(column);
    }
  }

  setExpand(data: XTableRow[]) {
    const getChildren = (node: XTableRow, level: number) => {
      node.level = level;
      node.expanded = Boolean(this.expandedAll) || level <= this.expandedLevel || this.expanded.includes(node.id);
      if (XIsUndefined(node.children)) node.children = data.filter((y) => y.pid === node.id);
      if (XIsUndefined(node.leaf)) node.leaf = (node.children?.length as number) > 0;
      if (node.leaf) node.children?.map((y) => getChildren(y, level + 1));
      return node;
    };
    this.treeTableData = data.filter((x) => XIsEmpty(x.pid)).map((x) => getChildren(x, 0));
  }

  setExpandedAll() {
    if (!this.treeTable || this.treeTableData?.length === 0) return;
    const setChildren = (nodes: XTableRow[]) => {
      if (XIsEmpty(nodes)) return;
      nodes.forEach((x) => {
        x.expanded = Boolean(this.expandedAll);
        setChildren(x.children as XTableRow[]);
      });
    };
    setChildren(this.treeTableData);
    this.detectChanges();
  }

  setHeadExpandList() {}

  checkSort(sort: XSort[]) {
    if (!this.dataIsFunc) return;
    if (typeof this.query === 'undefined') this.query = {};
    this.query.sort = sort;
    this.queryChange.emit(this.query);
    this.getDataByFunc();
  }

  headChecked(checked: boolean, column: XTableColumn) {
    this.tableData.forEach((x) => {
      x[column.id] = checked;
    });
    this.setCheckedValues(column);
    this.detectChanges();
  }

  bodyChecked(_checked: boolean, column: XTableColumn) {
    this.setCheckedValues(column);
    this.detectChanges();
  }

  setCheckedValues(column: XTableColumn) {
    const count = this.tableData.length;
    const checkedLen = this.tableData.filter((x) => x[column.id]).length;
    this.checkedValues[column.id] = count === checkedLen;
    this.checkedValues[column.id + this.indeterminate] = checkedLen > 0 && checkedLen < count;
  }

  detectChanges() {
    this.bodyChange && this.bodyChange();
    this.headChange && this.headChange();
    this.cdr.detectChanges();
  }
}
