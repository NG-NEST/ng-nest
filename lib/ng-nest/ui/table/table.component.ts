import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnDestroy,
  computed,
  signal,
  viewChild,
  inject,
  viewChildren,
  AfterViewChecked,
  SimpleChange
} from '@angular/core';
import {
  XTablePrefix,
  XTableProperty,
  XTableColumn,
  XTableRow,
  XTableCell,
  XTableCellConfigRule
} from './table.property';
import { XIsChange, XIsEmpty, XResultList, XSort, XIsUndefined, XIsArray } from '@ng-nest/ui/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { XPaginationComponent } from '@ng-nest/ui/pagination';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgClass } from '@angular/common';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XTableHeadComponent } from './table-head.component';
import { XTableFootComponent } from './table-foot.component';
import { XTableBodyComponent } from './table-body.component';
import { XOutletDirective } from '@ng-nest/ui/outlet';

@Component({
  selector: `${XTablePrefix}`,
  imports: [
    NgClass,
    XOutletDirective,
    XLoadingComponent,
    XTableHeadComponent,
    XTableFootComponent,
    XTableBodyComponent,
    XPaginationComponent
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTableComponent extends XTableProperty implements OnInit, OnDestroy, AfterViewChecked {
  renderer = inject(Renderer2);
  elementRef = inject(ElementRef<HTMLElement>);
  cdr = inject(ChangeDetectorRef);
  unSubject = new Subject<void>();

  classMap = computed(() => ({ [`${XTablePrefix}-row-size-${this.rowSize()}`]: !XIsEmpty(this.rowSize()) }));
  theads = signal<ElementRef<HTMLElement>[]>([]);
  tfoot = signal<ElementRef<HTMLElement> | null>(null);
  virtualBody = signal<CdkVirtualScrollViewport | null>(null);
  theadsChange: (() => void)[] = [];
  bodyChange!: () => void;
  scrollContentEle = signal<HTMLElement | null>(null);
  hasScrollY = signal(false);
  scrollYWidth = signal(0);
  hasScrollX = signal(false);
  scrollXHeight = signal(0);
  scrollXWidth = signal<number | null>(null);
  scrollLeft = signal(0);
  scrollLeftMax = signal(false);
  scrollTop = signal(0);
  rowChecked = signal<XTableColumn | null>(null);
  headCheckboxList = signal<XTableColumn[]>([]);
  rowExpand = signal<XTableColumn | null>(null);
  headExpandList = signal<XTableColumn[]>([]);
  dataIsFunc = signal(false);
  getting = signal(false);
  tableData = signal<XTableRow[]>([]);
  treeTableData = signal<XTableRow[]>([]);
  checkedValues = signal<{ [prop: string]: boolean }>({});
  indeterminate = signal('$$indeterminate');
  table = viewChild.required<ElementRef<HTMLElement>>('table');
  caption = viewChild<ElementRef<HTMLElement>>('caption');
  pagination = viewChild<XPaginationComponent>('pagination');
  stickyTopRightEle = viewChild<ElementRef<HTMLElement>>('stickyTopRightEle');
  stickyBottomRightEle = viewChild<ElementRef<HTMLElement>>('stickyBottomRightEle');
  headCom = viewChildren<XTableHeadComponent>(XTableHeadComponent);
  bodyCom = viewChildren<XTableBodyComponent>(XTableBodyComponent);
  footCom = viewChild<XTableFootComponent>(XTableFootComponent);

  getScrollLeft = computed(() => this.scrollLeft() > 0);
  getScrollTop = computed(() => this.scrollTop() > 0);
  getRowHeight = computed(() => (this.rowHeight() === 0 ? '' : this.rowHeight()));
  getStickyTopScrollTop = computed(() => (this.caption() ? this.caption()!.nativeElement.offsetHeight : 0));
  getStickyBottomScrollTop = computed(() => {
    let top = 0;
    if (this.footer() && this.tfoot()) {
      top += this.tfoot()!.nativeElement.clientHeight + 1;
    }
    return top;
  });
  getStickyTopRightEleHeight = computed(() => {
    if (this.stickyTopRightEle()) {
      return this.stickyTopRightEle()!.nativeElement.offsetHeight;
    } else {
      return 0;
    }
  });
  getStickyBottomRightEleHeight = computed(() => {
    if (this.stickyBottomRightEle()) {
      return this.stickyBottomRightEle()!.nativeElement.offsetHeight;
    } else {
      return 0;
    }
  });
  hasStickyTopRight = computed(
    () =>
      this.showHeader() &&
      (this.headerPosition() === 'top' || this.headerPosition() === 'top-bottom') &&
      this.columns().some((x) => Number(x.right) >= 0)
  );
  hasStickyTopRightSearch = computed(() => !!this.headSearchTpl());

  hasStickyBottomRight = computed(
    () =>
      this.showHeader() &&
      (this.headerPosition() === 'bottom' || this.headerPosition() === 'top-bottom') &&
      this.columns().some((x) => Number(x.right) >= 0)
  );

  cellConfigSignal = computed(() => {
    const cellConfig = this.cellConfig();
    if (!cellConfig) return;
    const setRule = (rule?: XTableCellConfigRule) => {
      if (!rule) return;
      let gridTemplateColumns = '',
        cells = [];
      if (!rule.gridTemplateColumns) {
        gridTemplateColumns = `${this.columns()
          .map((x) => {
            if (x.width) return x.width;
            if (x.flex) return `${x.flex}fr`;
            return '1fr';
          })
          .join(' ')}`;
      }
      if (!rule.cells) return;
      cells = rule.cells.map((y) => {
        const col = this.columns().find((z) => z.id === y.id);
        if (col) {
          return { ...col, ...y } as XTableCell;
        }
        return y;
      });
      return { gridTemplateColumns, cells };
    };

    return { thead: setRule(cellConfig.thead), tbody: setRule(cellConfig.tbody) };
  });

  tbodyHeight = signal(0);
  tbodyScrollHeight = signal(0);

  ngOnInit() {
    this.setRowChecked();
    this.setRowExpand();
  }

  ngOnChanges(simples: SimpleChanges) {
    const { data, checkedRow, columns, activatedRow, manual, showPagination, expandedAll, paginationPosition } =
      simples;
    XIsChange(expandedAll) && this.setExpandedAll();
    XIsChange(data, checkedRow) && this.setData();
    if (XIsChange(columns)) {
      this.setRowChecked();
      this.setRowExpand();
    }
    XIsChange(columns, activatedRow, showPagination) && this.cdr.detectChanges();
    XIsChange(manual) && this.setManual();
    XIsChange(paginationPosition) && this.setPaginationPosition(paginationPosition);
  }

  ngAfterViewChecked(): void {
    if (this.bodyCom().length > 0) {
      const first = this.bodyCom()[0].tbody().nativeElement;
      this.tbodyHeight.set(first.clientHeight);
      this.tbodyScrollHeight.set(first.scrollHeight);
      // let trs = first.tbody().nativeElement.querySelectorAll('tr');
      // let i = 0;
      // let h = 0;
      // while (i < trs.length) {
      //   h += trs[i].clientHeight;
      // }
      // this.trsHeight.set(h);
    }
  }

  ngOnDestroy() {
    this.unSubject.next();
    this.unSubject.complete();
  }

  setPaginationPosition(position: SimpleChange) {
    const { currentValue, previousValue } = position;
    if (previousValue) {
      this.renderer.removeClass(this.elementRef.nativeElement, `x-table-${previousValue}`);
    }
    if (currentValue) {
      this.renderer.addClass(this.elementRef.nativeElement, `x-table-${currentValue}`);
    }
  }

  getSticky(column: XTableColumn | XTableCell) {
    return this.getStickyLeft(column) || this.getStickyRight(column);
  }

  getStickyLeft(column: XTableColumn | XTableCell) {
    return Number(column.left) >= 0;
  }

  getStickyLeftLast(column: XTableColumn | XTableCell) {
    let lefts = this.columns().filter((x) => Number(x.left) >= 0);
    if (lefts.length === 0) return false;
    return lefts[lefts.length - 1].id === column.id;
  }

  getStickyRight(column: XTableColumn | XTableCell) {
    return Number(column.right) >= 0;
  }

  getStickyRightFirst(column: XTableColumn | XTableCell) {
    let rights = this.columns().filter((x) => Number(x.right) >= 0);
    if (rights.length === 0) return false;
    return rights[0].id === column.id;
  }

  getIndex(index: number) {
    return (this.index() - 1) * this.size() + index + 1;
  }

  setData() {
    const data = this.data();
    if (XIsArray<XTableRow>(data)) {
      this.dataIsFunc.set(false);
      this.tableData.set(data);
      this.setChecked(data);
      this.setHeadCheckboxList(data);
      this.setExpand(data);
      this.detectChanges();
    } else if (data instanceof Function) {
      this.dataIsFunc.set(true);
      this.getDataByFunc();
    }
  }

  getDataByFunc() {
    if (!this.manual() || !this.dataIsFunc()) return;
    this.getting.set(true);
    this.unSubject.next();
    (this.data() as Function)(this.index(), this.size(), this.query())
      .pipe(takeUntil(this.unSubject))
      .subscribe((x: XResultList<XTableRow>) => {
        let [data, total] = [x.list as XTableRow[], x.total!];
        if (this.virtualBody()) {
          this.virtualBody()!.scrollToIndex(0);
          this.virtualBody()!.checkViewportSize();
        }
        this.getting.set(false);
        this.tableData.set(data);
        this.setChecked(data);
        this.setHeadCheckboxList(data);
        this.setExpand(data);
        this.total.set(total);
      });
  }

  setManual() {
    this.getDataByFunc();
  }

  setRowChecked() {
    this.rowChecked.set(this.columns().find((x) => x.rowChecked) as XTableColumn);
    this.headCheckboxList.set(this.columns().filter((x) => x.type === 'checkbox' && x.headChecked));
  }

  setRowExpand() {
    this.rowExpand.set(this.columns().find((x) => x.rowExpand) as XTableColumn);
  }

  isExpandColumn(column: XTableColumn) {
    let expandColumn = this.columns().find((x) => x.id === column.id && x.type === 'expand');
    if (expandColumn) {
      return true;
    }
    return false;
  }

  pageChange(_type: 'index' | 'size') {
    this.getDataByFunc();
    this.resetScroll();
  }

  change(index: number) {
    this.index.set(index);
    this.getDataByFunc();
    this.resetScroll();
  }

  resetScroll(x = true, y = true) {
    if (this.hasScrollX() && x) this.virtualBody()?.scrollTo({ left: 0 });
    if (this.hasScrollY() && y) this.virtualBody()?.scrollTo({ top: 0 });
  }

  setChecked(data: XTableRow[]) {
    let result: XTableRow[] = [];
    if (XIsEmpty(data) || !this.checkedRow()) return;
    for (let key in this.checkedRow()) {
      const arr = this.checkedRow()[key];
      for (let item of data as any[]) {
        item[key] = arr.includes(item.id);
        result = [...result, item];
      }
    }
    if (result.length > 0) data = [...result];
  }

  setHeadCheckboxList(data: XTableRow[]) {
    if (XIsEmpty(data) || !this.headCheckboxList()) return;
    for (let column of this.headCheckboxList()) {
      this.setCheckedValues(column);
    }
  }

  setExpand(data: XTableRow[]) {
    const getChildren = (node: XTableRow, level: number) => {
      node.level = level;
      node.expanded = this.expandedAll() || level <= this.expandedLevel() || this.expanded().includes(node.id);
      if (XIsUndefined(node.children)) node.children = data.filter((y) => y.pid === node.id);
      if (XIsUndefined(node.leaf)) node.leaf = (node.children?.length as number) > 0;
      if (node.leaf) node.children?.map((y) => getChildren(y, level + 1));
      return node;
    };
    this.treeTableData.set(
      data
        .filter((x) => XIsEmpty(x.pid))
        .map((x, index) => {
          if (XIsUndefined(x.id)) x.id = index + 1;
          return getChildren(x, 0);
        })
    );
  }

  setExpandedAll() {
    if (!this.treeTable() || this.treeTableData()?.length === 0) return;
    const setChildren = (nodes: XTableRow[]) => {
      if (XIsEmpty(nodes)) return;
      nodes.forEach((x) => {
        x.expanded = Boolean(this.expandedAll());
        setChildren(x.children as XTableRow[]);
      });
    };
    this.treeTableData.update((x) => {
      setChildren(x);
      return [...x];
    });
  }

  checkSort(sort: XSort[]) {
    if (!this.dataIsFunc) return;
    let query = this.query();
    if (typeof query === 'undefined') query = {};
    query.sort = sort;
    this.query.set(query);
    this.getDataByFunc();
  }

  headChecked(checked: boolean, column: XTableColumn) {
    this.tableData.update((z) => {
      z.forEach((x) => {
        if (!x.disabled) {
          x[column.id] = checked;
        }
      });
      return [...z];
    });
    this.setCheckedValues(column);
    this.headCheckboxChange.emit({ rows: this.tableData(), checkbox: this.checkedValues() });
    this.detectChanges();
  }

  setCheckbox(rows: XTableRow[], column: XTableColumn) {
    this.setCheckedValues(column);
    for (let row of rows) {
      this.bodyCheckboxChange.emit(row);
    }
  }

  bodyChecked(column: XTableColumn, row: XTableRow) {
    this.setCheckedValues(column);
    this.bodyCheckboxChange.emit(row);
  }

  setCheckedValues(column: XTableColumn) {
    const notDisabled = this.tableData().filter((x) => !x.disabled);
    const count = notDisabled.length;
    const checkedLen = notDisabled.filter((x) => x[column.id]).length;
    this.checkedValues.update((x) => {
      x[column.id] = count === checkedLen && count !== 0;
      x[column.id + this.indeterminate()] = checkedLen > 0 && checkedLen < count;
      return { ...x };
    });
  }

  detectChanges() {
    this.headCom()?.forEach((x) => {
      x.cdr.markForCheck();
    });
    this.bodyCom()?.forEach((x) => {
      x.cdr.markForCheck();
    });
    this.footCom()?.cdr.markForCheck();
    this.cdr.markForCheck();
  }
}
