import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Host,
  Optional,
  SimpleChanges,
  OnChanges,
  Inject,
  ViewChild
} from '@angular/core';
import { XTableBodyPrefix, XTableBodyProperty, XTableRow, XTableColumn } from './table.property';
import { removeNgTag, XIsChange, XResize, XConfigService, XNumber } from '@ng-nest/ui/core';
import { XTableComponent } from './table.component';
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

  @ViewChild('tbody') tbody: ElementRef;
  @ViewChild('virtualBody') virtualBody: CdkVirtualScrollViewport;

  private _unSubject = new Subject<void>();
  private _resizeObserver: ResizeObserver;

  constructor(
    @Host() @Optional() public table: XTableComponent,
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) public doc: any,
    public configService: XConfigService
  ) {
    super();
  }
  ngOnChanges(simples: SimpleChanges) {
    XIsChange(simples.data, simples.columns, simples.activatedRow, simples.mergeRule) && this.cdr.detectChanges();
  }

  ngOnInit() {
    removeNgTag(this.elementRef.nativeElement);
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
          if (ele.scrollLeft >= 0 && this.table.thead) {
            this.table.thead.nativeElement.scrollLeft = this.table.scrollLeft;
          }
          this.table.cdr.detectChanges();
        });
    }
  }

  setScroll() {
    if (!this.virtualBody || !this.table.thead) return;
    const ele = this.virtualBody.elementRef.nativeElement;
    const hasY = ele.scrollHeight > this.bodyHeight;
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

  setAdaptionHeight() {
    if (this.adaptionHeight > 0) {
      const headHeight = this.table.thead?.nativeElement.clientHeight || 0;
      const footHeight = this.table.tfoot?.nativeElement.clientHeight || 0;
      const paginationHeight = this.table.pagination?.elementRef.nativeElement.clientHeight || 0;
      this.bodyHeight =
        Number(this.docPercent) * this.doc.documentElement.clientHeight -
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

  rowClick(row: XTableRow) {
    this.activatedRow = row;
    if (this.table.rowChecked) {
      if (!Array.from((event as any).path).find((x: any) => x.localName == 'x-checkbox')) {
        row[this.table.rowChecked.id] = !row[this.table.rowChecked.id];
        this.table.bodyChecked(row[this.table.rowChecked.id], this.table.rowChecked);
      }
    }
    this.activatedRowChange.emit(row);
    this.cdr.detectChanges();
  }

  trackByItem(index: number, item: XTableRow | XTableColumn) {
    return item.id;
  }
}
