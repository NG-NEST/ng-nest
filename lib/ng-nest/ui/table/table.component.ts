import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { XTablePrefix, XTableProperty, XTableColumn } from './table.property';
import { XIsChange } from '@ng-nest/ui/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { XPaginationComponent } from '../pagination';

@Component({
  selector: `${XTablePrefix}`,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTableComponent extends XTableProperty implements OnInit {
  get getScrollLeft() {
    return this.scrollLeft > 0;
  }
  get getScrollTop() {
    return this.scrollTop > 0;
  }
  thead: ElementRef;
  tfoot: ElementRef;
  virtualBody: CdkVirtualScrollViewport;
  scrollContentEle: HTMLElement;
  hasScrollY = false;
  scrollYWidth = 0;
  hasScrollX = false;
  scrollXHeight = 0;
  scrollXWidth: number | null;
  scrollLeft = 0;
  scrollTop = 0;
  @ViewChild('table') table: ElementRef;
  @ViewChild('pagination') pagination: XPaginationComponent;
  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.setClassMap();
  }

  ngOnChanges(simples: SimpleChanges) {
    XIsChange(simples.data, simples.columns, simples.activatedRow) && this.cdr.detectChanges();
  }

  setClassMap() {}

  getSticky(column: XTableColumn) {
    return Number(column.left) >= 0;
  }

  getIndex(index: number) {
    return (Number(this.index) - 1) * Number(this.size) + index + 1;
  }

  change(index: number) {
    this.index = index;
    this.indexChange.emit(index);
    this.resetScroll();
  }

  resetScroll(x = true, y = true) {
    if (this.hasScrollX && x) this.virtualBody?.scrollTo({ left: 0 });
    if (this.hasScrollY && y) this.virtualBody?.scrollTo({ top: 0 });
  }
}
