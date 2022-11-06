import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
  Inject,
  ViewChild,
  Input
} from '@angular/core';
import { XTableBodyPrefix, XTableBodyProperty, XTableRow, XTableColumn, XTableCell } from './table.property';
import { removeNgTag, XIsChange, XResize, XConfigService, XNumber, stripTags } from '@ng-nest/ui/core';
import { Subject, fromEvent } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: `${XTableBodyPrefix}`,
  templateUrl: './table-body.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTableBodyComponent extends XTableBodyProperty implements OnInit, OnChanges {
  tbodyStyle: { [property: string]: any } = {};
  get isEmpty() {
    return this.data?.length === 0;
  }
  get getRowHeight() {
    return this.rowHeight == 0 ? '' : this.rowHeight;
  }
  get getItemSize() {
    return this.rowHeight !== 0 && this.itemSize > this.rowHeight ? this.rowHeight : this.itemSize;
  }

  @ViewChild('tbody') tbody!: ElementRef;
  @ViewChild('virtualBody') virtualBody!: CdkVirtualScrollViewport;
  @Input() table: any;

  private _unSubject = new Subject<void>();
  private _resizeObserver!: ResizeObserver;

  constructor(
    // @Optional() @Host() public table: XTableComponent,
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) public doc: any,
    public configService: XConfigService
  ) {
    super();
  }
  ngOnChanges(simples: SimpleChanges) {
    const { data, columns, activatedRow, mergeRule, expandedAll, adaptionHeight } = simples;
    XIsChange(data, columns, activatedRow, mergeRule, expandedAll) && this.cdr.detectChanges();
    XIsChange(adaptionHeight) && this.setAdaptionHeight();
  }

  ngOnInit() {
    removeNgTag(this.elementRef.nativeElement);
    if (this.level > 0) removeNgTag(this.tbody.nativeElement);
    if (this.scroll?.y && !this.bodyHeight) {
      this.bodyHeight = this.scroll.y;
    }
  }

  ngAfterViewInit() {
    this.table.virtualBody = this.virtualBody;
    this.table.bodyChange = () => this.cdr.detectChanges();
    this.setSubject();
    this.setScroll();
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
    this._resizeObserver?.disconnect();
  }

  setSubject() {
    if (this.virtualBody) {
      this.table.scrollContentEle = this.virtualBody?.elementRef?.nativeElement.querySelector(
        '.cdk-virtual-scroll-content-wrapper'
      ) as HTMLElement;
      if (this.scroll?.x) {
        this.renderer.setStyle(this.table.scrollContentEle, 'width', `${this.scroll.x}px`);
      }
      XResize(this.table.table.nativeElement, this.table.scrollContentEle)
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
    if (this.table.scrollContentEle) {
      fromEvent(this.virtualBody.elementRef.nativeElement, 'scroll')
        .pipe(takeUntil(this._unSubject))
        .subscribe((x) => {
          const ele = x.srcElement as HTMLElement;
          this.table.scrollTop = ele.scrollTop;
          this.table.scrollLeft = ele.scrollLeft;
          if (ele.scrollLeft >= 0 && this.table.thead.length > 0) {
            for (let thead of this.table.thead) {
              thead.nativeElement.scrollLeft = this.table.scrollLeft;
            }
          }
          this.table.scrollLeftMax = ele.scrollLeft + ele.clientWidth === ele.scrollWidth;
          this.table.cdr.detectChanges();
        });
    }
  }

  setScroll() {
    if (!this.virtualBody) return;
    const ele = this.virtualBody.elementRef.nativeElement;
    const hasY = ele.scrollHeight > (this.bodyHeight as number);
    const hasX = this.table.scrollContentEle.clientWidth > ele.clientWidth;

    if (!this.table.hasScrollY && hasY) {
      this.table.hasScrollY = true;
      this.table.scrollYWidth = ele.offsetWidth - ele.clientWidth;
    } else if (this.table.hasScrollY && !hasY) {
      this.table.hasScrollY = false;
      this.table.scrollYWidth = 0;
    }

    if (!this.table.hasScrollX && hasX) {
      this.table.hasScrollX = true;
      this.table.scrollXHeight = ele.offsetHeight - ele.clientHeight;
    } else if (this.table.hasScrollX && !hasX) {
      this.table.hasScrollX = false;
      this.table.scrollXHeight = 0;
      this.table.scrollXWidth = null;
    }
    if (hasX) {
      this.table.scrollXWidth = ele.offsetWidth + ele.scrollWidth - ele.clientWidth;
    }

    this.table.cdr.detectChanges();
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
    this.tbodyStyle = {
      height: `${height}px`
    };
  }

  getIndex(index: number, item: XTableRow) {
    if (!isNaN(index)) return index;
    return this.data.indexOf(item);
  }

  getFlex(column: XTableColumn) {
    if (column.width) return 'none';
    if (!column.flex) return 1;
    return column.flex;
  }

  getTitle(row: XTableRow, column: XTableCell | any) {
    let it = row[column.id as string];
    return it ? stripTags(it) : '';
  }

  setAdaptionHeight() {
    if ((this.adaptionHeight as number) > 0) {
      const captionHeight = this.table.tcaption?.nativeElement.clientHeight || 0;
      let headHeight = 0;
      for (let thead of this.table.thead) {
        headHeight += thead.nativeElement.clientHeight;
      }
      const footHeight = this.table.tfoot?.nativeElement.clientHeight || 0;
      const paginationHeight = this.table.pagination?.elementRef.nativeElement.clientHeight || 0;
      this.bodyHeight =
        Number(this.docPercent) * this.doc.documentElement.clientHeight -
        captionHeight -
        headHeight -
        footHeight -
        paginationHeight -
        Number(this.adaptionHeight);
      if (this.bodyHeight < 0) this.bodyHeight = 0;
      this.minBufferPx = this.bodyHeight;
      this.maxBufferPx = this.bodyHeight * 1.2;
      this.virtualBody['_scrollStrategy']['_minBufferPx'] = this.minBufferPx;
      this.virtualBody['_scrollStrategy']['_maxBufferPx'] = this.maxBufferPx;
      this.cdr.detectChanges();
    }
  }

  rowClick(event: Event, row: XTableRow) {
    if (row.disabled) return;
    this.activatedRow = row;
    if (this.table.allowCheckRow && this.table.rowChecked) {
      if (!Array.from((event as any).path).find((x: any) => x.localName == 'x-checkbox')) {
        row[this.table.rowChecked.id] = !row[this.table.rowChecked.id];
        this.table.bodyChecked(row[this.table.rowChecked.id], this.table.rowChecked);
      }
    }
    this.activatedRowChange.emit(row);
    this.cdr.detectChanges();
  }

  onExpanded(_event: Event, node: XTableRow) {
    node.expanded = !node.expanded;
    this.cdr.detectChanges();
  }

  trackByItem(_index: number, item: XTableRow | XTableColumn) {
    return item.id;
  }
}
