import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  Optional,
  Host,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { XTableHeadPrefix, XTableHeadProperty, XTableColumn, XTableCell } from './table.property';
import { removeNgTag, XIsEmpty, XSort, XIsChange, XConfigService, XNumber } from '@ng-nest/ui/core';
import { XTableComponent } from './table.component';

@Component({
  selector: `${XTableHeadPrefix}`,
  templateUrl: './table-head.component.html',
  encapsulation: ViewEncapsulation.None
})
export class XTableHeadComponent extends XTableHeadProperty implements OnInit {
  sort: XSort[] = [];
  sortStr = '';
  theadStyle: { [property: string]: any } = {};
  @ViewChild('thead') thead!: ElementRef;
  constructor(
    @Optional() @Host() public table: XTableComponent,
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    public configService: XConfigService
  ) {
    super();
  }

  ngOnChanges(simples: SimpleChanges) {
    XIsChange(simples.columns, simples.scrollYWidth, simples.scrollXWidth, simples.cellConfig) && this.cdr.detectChanges();
  }

  ngOnInit() {
    removeNgTag(this.elementRef.nativeElement);
    this.setStyle();
  }

  ngAfterViewInit() {
    this.table.thead = this.thead;
    this.table.headChange = () => this.cdr.detectChanges();
  }

  getSticky(column: XTableColumn | XTableCell) {
    return Number(column.left) >= 0;
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
      height: `${height}px`
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

  trackByItem(index: number, item: XTableColumn) {
    return item.id;
  }
}
