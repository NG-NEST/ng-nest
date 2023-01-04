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
import { XTableHeadPrefix, XTableHeadProperty, XTableColumn, XTableCell, XTablePrefix } from './table.property';
import { removeNgTag, XIsEmpty, XSort, XIsChange, XConfigService, XNumber, XClassMap } from '@ng-nest/ui/core';
import { CdkDragDrop, CdkDragSortEvent, moveItemInArray } from '@angular/cdk/drag-drop';

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
  @ViewChild('thead') thead!: ElementRef;
  @Input() table: any;
  get getRowHeight() {
    return this.rowHeight == 0 ? '' : this.rowHeight;
  }
  constructor(
    // @Optional() @Host() public table: XTableComponent,
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    public configService: XConfigService
  ) {
    super();
  }

  ngOnChanges(simples: SimpleChanges) {
    const { columns, scrollYWidth, scrollXWidth, cellConfig } = simples;
    XIsChange(columns, scrollYWidth, scrollXWidth, cellConfig) && this.cdr.detectChanges();
  }

  ngOnInit() {
    removeNgTag(this.elementRef.nativeElement);
    this.setStyle();
  }

  ngAfterViewInit() {
    this.table.thead.push(this.thead);
    this.table.headChange = () => this.cdr.detectChanges();
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

  dragWidth(dis: { x: number; y: number }, column: XTableColumn | XTableCell) {
    if (column.width) {
      (column.width as number) += dis.x;
      if (column.width < 60) column.width = 60;
      this.cdr.detectChanges();
      this.table.bodyChange();
    }
  }

  dropListDropped(_event: CdkDragDrop<XTableColumn[]>) {
    this.table.bodyChange();
    this.table.columnDropListDropped.emit(this.columns);
  }

  dropListSorted(event: CdkDragSortEvent<XTableColumn[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    this.table.bodyChange();
  }

  dragStarted(column: XTableColumn) {
    column.dragging = true;
    this.table.bodyChange();
    this.table.columnDragStarted.emit(column);
  }

  dragEnded(column: XTableColumn) {
    column.dragging = false;
    this.table.bodyChange();
    this.table.columnDragEnded.emit(column);
  }

  trackByItem(_index: number, item: XTableColumn) {
    return item.id;
  }
}
