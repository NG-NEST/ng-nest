import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  SimpleChanges,
  ViewChild,
  Input
} from '@angular/core';
import {
  XTableHeadPrefix,
  XTableHeadProperty,
  XTableColumn,
  XTableCell,
  XTablePrefix
} from './table.property';
import {
  removeNgTag,
  XIsEmpty,
  XSort,
  XIsChange,
  XConfigService,
  XNumber,
  XClassMap,
  XIsFunction
} from '@ng-nest/ui/core';
import {
  CdkDragDrop,
  CdkDragSortEvent,
  CdkDragStart,
  moveItemInArray
} from '@angular/cdk/drag-drop';

@Component({
  selector: `${XTableHeadPrefix}`,
  templateUrl: './table-head.component.html',
  encapsulation: ViewEncapsulation.None
})
export class XTableHeadComponent extends XTableHeadProperty implements OnInit {
  sort: XSort[] = [];
  sortStr = '';
  theadStyle: { [property: string]: any } = {};
  thClassMap: XClassMap = {};
  @ViewChild('thead') thead!: ElementRef<HTMLElement>;
  @Input() table: any;
  initColumns: XTableColumn[] = [];

  get getRowHeight() {
    return this.rowHeight == 0 ? '' : this.rowHeight;
  }
  constructor(
    // @Optional() @Host() public table: XTableComponent,
    public renderer: Renderer2,
    public elementRef: ElementRef<HTMLElement>,
    public cdr: ChangeDetectorRef,
    public configService: XConfigService
  ) {
    super();
  }

  ngOnChanges(simples: SimpleChanges) {
    const { columns, scrollYWidth, scrollXWidth, cellConfig } = simples;
    if (XIsChange(columns)) {
      this.initColumns = [...this.columns];
    }
    XIsChange(columns, scrollYWidth, scrollXWidth, cellConfig) && this.cdr.detectChanges();
  }

  ngOnInit() {
    removeNgTag(this.elementRef.nativeElement);
    this.setStyle();
  }

  ngAfterViewInit() {
    this.table.theads.push(this.thead);
    this.table.theadsChange.push(() => this.cdr.detectChanges());
    this.setThClassMap();
  }

  setThClassMap() {
    this.thClassMap = {
      [`${XTablePrefix}-th-${this.table.rowSize}`]: !XIsEmpty(this.table.rowSize)
    };
  }

  getFlex(column: XTableColumn) {
    if (column.width) return 'none';
    if (!column.flex) return 1;
    return column.flex;
  }

  getColumnRight(right?: number) {
    if (Number(right) >= 0) {
      if (Number(this.scrollYWidth) >= 0) {
        return Number(right) + Number(this.scrollYWidth);
      }
      return Number(right);
    }
    // return right;
    return '';
  }

  getColumnWidth(column: XTableColumn) {
    // if (Number(column.right) === 0) {
    //   if (Number(this.scrollYWidth) >= 0) {
    //     return Number(column.width) + Number(this.scrollYWidth);
    //   }
    //   return column.width;
    // }
    return column.width;
  }

  setStyle() {
    let height = this.rowHeight == 0 ? '' : this.rowHeight;
    if (this.cellConfig && this.cellConfig.cells) {
      const spt = this.cellConfig.cells.map((x) => {
        const gridAreaSpt = x.gridArea?.split('/');
        return gridAreaSpt && gridAreaSpt.length > 3 ? Number(gridAreaSpt[2]) : 2;
      });
      height = ((Math.max(...spt) - 1) * (height as number)) as XNumber;
    }
    this.theadStyle = {
      // height: `${height}px`,
      ['min-height']: `${this.getRowHeight}px`
    };
  }

  onSort(column: XTableColumn) {
    if (!column.sort) return;
    if (XIsEmpty(this.sort)) this.sort = [];
    let sort = this.sort?.find((y) => y.field === column.id);
    if (sort) {
      if (sort.value === 'asc') {
        this.sort = [];
        this.sortStr = '';
      } else {
        sort.value = 'asc';
      }
    } else {
      sort = { field: column.id, value: 'desc' };
      this.sort = [sort];
    }
    if (!XIsEmpty(this.sort)) this.sortStr = `${sort.field} ${sort.value}`;
    this.table.checkSort(this.sort);
    this.table.sortChange.emit(this.sort);
    this.table.resetScroll(false, true);
    this.cdr.detectChanges();
  }

  dragWidthMoved(
    position: { x: number; y: number; offsetX: number; offsetY: number },
    column: XTableColumn | XTableCell
  ) {
    if (column.width) {
      (column.width as number) += position.offsetX;
      if (column.width < 60) column.width = 60;
      XIsFunction(column.dragWidthMoved) && column.dragWidthMoved({ position, column });
      this.table.columnDragWidthMoved.emit({ position, column });
      this.cdr.detectChanges();
      this.table.bodyChange();
    }
  }

  dragWidthStarted(position: { x: number; y: number }, column: XTableColumn | XTableCell) {
    column.draggingWidth = true;
    if (column.width && XIsFunction(column.dragWidthStarted)) {
      column.dragWidthStarted({ position, column });
      this.table.columnDragWidthStarted.emit({ position, column });
    }
  }

  dragWidthEnded(position: { x: number; y: number }, column: XTableColumn | XTableCell) {
    column.draggingWidth = false;
    if (column.width && XIsFunction(column.dragWidthEnded)) {
      column.dragWidthEnded({ position, column });
      this.table.columnDragWidthEnded.emit({ position, column });
    }
  }

  dropListDropped(event: CdkDragDrop<XTableColumn[]>) {
    const previous = this.initColumns[event.previousIndex];
    const current = this.initColumns[event.currentIndex];
    const middle = { left: previous.left, right: previous.right };
    previous.left = current.left;
    previous.right = current.right;
    current.left = middle.left;
    current.right = middle.right;
    moveItemInArray(this.initColumns, event.previousIndex, event.currentIndex);
    this.table.columnDropListDropped.emit(this.initColumns);
  }

  dropListSorted(event: CdkDragSortEvent<XTableColumn[]>) {
    const previous = this.columns[event.previousIndex];
    const current = this.columns[event.currentIndex];
    const middle = { left: previous.left, right: previous.right };
    previous.left = current.left;
    previous.right = current.right;
    current.left = middle.left;
    current.right = middle.right;
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    this.dragChange();
  }

  dragStarted(_event: CdkDragStart, column: XTableColumn) {
    column.dragging = true;
    this.dragChange();
    this.table.theadsChanges();
    this.table.columnDragStarted.emit(column);
  }

  dragEnded(column: XTableColumn) {
    column.dragging = false;
    this.dragChange();
    this.table.theadsChanges();
    this.table.columnDragEnded.emit(column);
  }

  dragChange() {
    this.table.bodyChange();
  }

  trackByItem(_index: number, item: XTableColumn) {
    return item.id;
  }
}
