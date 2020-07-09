import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Optional,
  Host,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { XTableHeadPrefix, XTableHeadProperty, XTableColumn } from './table.property';
import { removeNgTag, XIsEmpty, XSort, XIsChange, XConfigService } from '@ng-nest/ui/core';
import { XTableComponent } from './table.component';

@Component({
  selector: `${XTableHeadPrefix}`,
  templateUrl: './table-head.component.html',
  encapsulation: ViewEncapsulation.None
})
export class XTableHeadComponent extends XTableHeadProperty implements OnInit {
  sort: XSort[] = [];
  sortStr = '';
  @ViewChild('thead') thead: ElementRef;
  constructor(
    @Host() @Optional() public table: XTableComponent,
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    public configService: XConfigService
  ) {
    super();
  }

  ngOnChanges(simples: SimpleChanges) {
    XIsChange(simples.columns, simples.scrollYWidth, simples.scrollXWidth) && this.cdr.detectChanges();
  }

  ngOnInit() {
    removeNgTag(this.elementRef.nativeElement);
  }

  ngAfterViewInit() {
    this.table.thead = this.thead;
  }

  getSticky(column: XTableColumn) {
    return Number(column.left) >= 0;
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
}
