import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  inject,
  computed,
  viewChild,
  signal,
  effect
} from '@angular/core';
import { XTableBodyPrefix, XTableBodyProperty, XTableRow, XTableColumn, XTableCell } from './table.property';
import { XRemoveNgTag, XResize, XNumber, XStripTags, XParentPath, XResizeObserver } from '@ng-nest/ui/core';
import { Subject, fromEvent } from 'rxjs';
import { DOCUMENT, NgClass, NgTemplateOutlet } from '@angular/common';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { map, takeUntil } from 'rxjs/operators';
import { XEmptyComponent } from '@ng-nest/ui/empty';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XCheckboxComponent } from '@ng-nest/ui/checkbox';
import { FormsModule } from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XTableComponent } from './table.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: `${XTableBodyPrefix}`,
  standalone: true,
  imports: [
    NgClass,
    NgTemplateOutlet,
    FormsModule,
    XEmptyComponent,
    ScrollingModule,
    XOutletDirective,
    XCheckboxComponent,
    XButtonComponent
  ],
  templateUrl: './table-body.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTableBodyComponent extends XTableBodyProperty implements OnInit {
  renderer = inject(Renderer2);
  elementRef = inject(ElementRef<HTMLElement>);
  cdr = inject(ChangeDetectorRef);
  tbody = viewChild.required<ElementRef<HTMLElement>>('tbody');
  virtualBody = viewChild(CdkVirtualScrollViewport);
  table = inject(XTableComponent, { optional: true })!;
  private doc = inject(DOCUMENT);
  private unSubject = new Subject<void>();
  private resizeObserver!: XResizeObserver;
  tbodyStyle = signal<{ [property: string]: any }>({});

  isEmpty = computed(() => this.data().length === 0);
  getRowHeight = computed(() => (this.rowHeight() == 0 ? '' : this.rowHeight()));
  getItemSize = computed(() =>
    this.rowHeight() !== 0 && this.itemSize() > this.rowHeight() ? this.rowHeight() : this.itemSize()
  );
  docChanged = toSignal(
    fromEvent(this.doc.defaultView!, 'resize').pipe(map(() => this.doc.documentElement.clientWidth))
  );

  bodyHeightSignal = computed(() => {
    const adaptionHeight = this.adaptionHeight();
    if (adaptionHeight && adaptionHeight > 0) {
      this.docChanged();
      const captionHeight = this.table.caption()?.nativeElement.clientHeight || 0;
      let headHeight = 0;
      for (let thead of this.table.theads()) {
        headHeight += thead.nativeElement.clientHeight;
      }
      const footHeight = this.table.tfoot()?.nativeElement.clientHeight || 0;
      const paginationHeight = this.table.pagination()?.elementRef.nativeElement.clientHeight || 0;
      let bodyHeight =
        this.docPercent() * this.doc.documentElement.clientHeight -
        captionHeight -
        headHeight -
        footHeight -
        paginationHeight -
        adaptionHeight;
      if (bodyHeight < 0) bodyHeight = 0;
      return bodyHeight;
    }
    if (this.scroll()?.y && !this.bodyHeight()) {
      return this.scroll()!.y;
    }
    return this.bodyHeight();
  });

  minBufferPxSignal = computed(() => {
    const adaptionHeight = this.adaptionHeight();
    if (adaptionHeight && adaptionHeight > 0) {
      return this.bodyHeight();
    }
    return this.minBufferPx();
  });

  maxBufferPxSignal = computed(() => {
    const adaptionHeight = this.adaptionHeight();
    if (adaptionHeight && adaptionHeight > 0) {
      return this.bodyHeight()! * 1.2;
    }
    return this.maxBufferPx();
  });

  constructor() {
    super();
    effect(() => {
      if (this.virtualBody()) {
        this.virtualBody()!['_scrollStrategy']['_minBufferPx'] = this.minBufferPxSignal();
      }
    });
    effect(() => {
      if (this.virtualBody()) {
        this.virtualBody()!['_scrollStrategy']['_maxBufferPx'] = this.maxBufferPxSignal();
      }
    });
  }

  ngOnInit() {
    XRemoveNgTag(this.elementRef.nativeElement);
    if (this.level() > 0) XRemoveNgTag(this.tbody().nativeElement);
  }

  ngAfterViewInit() {
    this.table.virtualBody.set(this.virtualBody()!);
    // this.table.bodyChange = () => this.cdr.detectChanges();
    this.setSubject();
    this.setScroll();
  }

  ngOnDestroy(): void {
    this.unSubject.next();
    this.unSubject.complete();
    this.resizeObserver?.disconnect();
  }

  setSubject() {
    if (this.virtualBody()) {
      this.table.scrollContentEle.set(
        this.virtualBody()!.elementRef.nativeElement.querySelector('.cdk-virtual-scroll-content-wrapper') as HTMLElement
      );
      if (this.scroll()?.x) {
        this.renderer.setStyle(this.table.scrollContentEle()!, 'width', `${this.scroll()?.x}px`);
      }
      XResize(this.table.table().nativeElement, this.table.scrollContentEle()!)
        .pipe(takeUntil(this.unSubject))
        .subscribe((x) => {
          this.resizeObserver = x.resizeObserver;
          this.setScroll();
        });
    }
    if (this.table.scrollContentEle()) {
      fromEvent(this.virtualBody()!.elementRef.nativeElement, 'scroll')
        .pipe(takeUntil(this.unSubject))
        .subscribe((x) => {
          const ele = x.srcElement as HTMLElement;
          this.table.scrollTop.set(ele.scrollTop);
          this.table.scrollLeft.set(ele.scrollLeft);
          if (ele.scrollLeft >= 0 && this.table.theads().length > 0) {
            for (let thead of this.table.theads()) {
              thead.nativeElement.scrollLeft = this.table.scrollLeft();
            }
          }
          this.table.scrollLeftMax.set(ele.scrollLeft + ele.clientWidth === ele.scrollWidth);
        });
    }
  }

  setScroll() {
    if (!this.virtualBody()) return;
    const ele = this.virtualBody()!.elementRef.nativeElement;
    const hasY = ele.scrollHeight > this.bodyHeightSignal()!;
    const hasX = this.table.scrollContentEle()!.clientWidth > ele.clientWidth;

    if (!this.table.hasScrollY() && hasY) {
      this.table.hasScrollY.set(true);
      this.table.scrollYWidth.set(ele.offsetWidth - ele.clientWidth);
    } else if (this.table.hasScrollY() && !hasY) {
      this.table.hasScrollY.set(false);
      this.table.scrollYWidth.set(0);
    }

    if (!this.table.hasScrollX() && hasX) {
      this.table.hasScrollX.set(true);
      this.table.scrollXHeight.set(ele.offsetHeight - ele.clientHeight);
    } else if (this.table.hasScrollX() && !hasX) {
      this.table.hasScrollX.set(false);
      this.table.scrollXHeight.set(0);
      this.table.scrollXWidth.set(null);
    }
    if (hasX) {
      this.table.scrollXWidth.set(ele.offsetWidth + ele.scrollWidth - ele.clientWidth);
    }

    this.virtualBody()!.checkViewportSize();

    // this.table.cdr.detectChanges();
  }

  setStyle() {
    let height = this.rowHeight() === 0 ? '' : this.rowHeight();
    if (this.cellConfig() && this.cellConfig()!.cells) {
      const spt = this.cellConfig()!.cells?.map((x) => {
        const gridAreaSpt = x.gridArea?.split('/');
        return gridAreaSpt && gridAreaSpt.length > 3 ? Number(gridAreaSpt[2]) : 2;
      });
      height = ((Math.max(...spt!) - 1) * (height as number)) as XNumber;
    }
    this.tbodyStyle.set({
      height: `${height}px`
    });
  }

  getIndex(index: number, item: XTableRow) {
    if (!isNaN(index)) return index;
    console.log(this.data(), item);
    return this.data().indexOf(item);
  }

  getFlex(column: XTableColumn) {
    if (column.width) return 'none';
    if (!column.flex) return 1;
    return column.flex;
  }

  getTitle(row: XTableRow, column: XTableCell | any) {
    let it = row[column.id as string];
    return it ? XStripTags(it) : '';
  }

  rowClick(event: Event, row: XTableRow) {
    if (row.disabled) return;
    this.activatedRow.set(row);
    if (this.table.allowCheckRow() && this.table.rowChecked()) {
      if (!XParentPath(event.target as HTMLElement).includes('x-checkbox')) {
        row[this.table.rowChecked()!.id] = !row[this.table.rowChecked()!.id];
        this.table.bodyChecked(row[this.table.rowChecked()!.id], this.table.rowChecked()!, row);
      }
    }
    // this.cdr.detectChanges();
  }

  onExpanded(_event: Event, node: XTableRow) {
    node.expanded = !node.expanded;
    // this.cdr.detectChanges();
  }

  trackByItem(_index: number, item: XTableRow | XTableColumn) {
    return item.id;
  }
}
