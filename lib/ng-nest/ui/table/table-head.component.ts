import {
  Component,
  OnInit,
  ViewEncapsulation,
  ElementRef,
  inject,
  computed,
  viewChild,
  signal,
  ChangeDetectorRef
} from '@angular/core';
import { XTableHeadPrefix, XTableHeadProperty, XTableColumn, XTableCell, XTablePrefix } from './table.property';
import { XIsEmpty, XSort, XNumber, XIsFunction, XRemoveNgTag } from '@ng-nest/ui/core';
import { CdkDragDrop, CdkDragSortEvent, CdkDragStart, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import { XDragDirective } from '@ng-nest/ui/drag';
import { XCheckboxComponent } from '@ng-nest/ui/checkbox';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XIconComponent } from '@ng-nest/ui/icon';
import { FormsModule } from '@angular/forms';
import { XTableComponent } from './table.component';

@Component({
  selector: `${XTableHeadPrefix}`,
  imports: [
    NgStyle,
    NgClass,
    NgTemplateOutlet,
    FormsModule,
    XDragDirective,
    DragDropModule,
    XCheckboxComponent,
    XOutletDirective,
    XIconComponent
  ],
  templateUrl: './table-head.component.html',
  encapsulation: ViewEncapsulation.None
})
export class XTableHeadComponent extends XTableHeadProperty implements OnInit {
  table = inject(XTableComponent, { optional: true })!;
  cdr = inject(ChangeDetectorRef);

  thead = viewChild.required<ElementRef<HTMLElement>>('thead');
  sort = signal<XSort[]>([]);
  sortStr = signal('');
  theadStyle = computed(() => {
    let height = this.getHeaderHeight();
    if (this.cellConfig() && this.cellConfig()!.cells) {
      const spt = this.cellConfig()!.cells?.map((x) => {
        const gridAreaSpt = x.gridArea?.split('/');
        return gridAreaSpt && gridAreaSpt.length > 3 ? Number(gridAreaSpt[2]) : 2;
      });
      height = ((Math.max(...spt!) - 1) * (height as number)) as XNumber;
    }
    return {
      ['min-height']: `${height}px`
    };
  });
  thClassMap = computed(() => ({
    [`${XTablePrefix}-th-${this.table.rowSize()}`]: !XIsEmpty(this.table.rowSize())
  }));

  initColumns = computed(() => [...this.columns()]);
  getRowHeight = computed(() => (this.rowHeight() == 0 ? '' : this.rowHeight()));
  getHeaderHeight = computed(() => this.headerHeight() ?? this.getRowHeight());

  private elementRef = inject(ElementRef);

  ngOnInit() {
    XRemoveNgTag(this.elementRef.nativeElement);
  }

  ngAfterViewInit() {
    this.table.theads.update((x) => {
      x.push(this.thead());
      return [...x];
    });
  }

  getFlex(column: XTableColumn) {
    if (column.width) return 'none';
    if (!column.flex) return 1;
    return column.flex;
  }

  getColumnRight(right?: number) {
    if (Number(right) >= 0) {
      if (Number(this.scrollYWidth()) >= 0) {
        return Number(right) + Number(this.scrollYWidth());
      }
      return Number(right);
    }
    return '';
  }

  getColumnWidth(column: XTableColumn) {
    return column.width;
  }

  onSort(column: XTableColumn) {
    if (!column.sort) return;
    if (XIsEmpty(this.sort())) this.sort.set([]);
    let sort = this.sort()!.find((y) => y.field === column.id);
    if (sort) {
      if (sort.value === 'asc') {
        this.sort.set([]);
        this.sortStr.set('');
      } else {
        sort.value = 'asc';
      }
    } else {
      sort = { field: column.id, value: 'desc' };
      this.sort.set([sort]);
    }
    if (!XIsEmpty(this.sort())) this.sortStr.set(`${sort.field} ${sort.value}`);
    this.table.checkSort(this.sort());
    this.table.sortChange.emit(this.sort());
    this.table.resetScroll(false, true);
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
      this.table.detectChanges();
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
    const previous = this.initColumns()[event.previousIndex];
    const current = this.initColumns()[event.currentIndex];
    const middle = { left: previous.left, right: previous.right };
    previous.left = current.left;
    previous.right = current.right;
    current.left = middle.left;
    current.right = middle.right;
    moveItemInArray(this.initColumns(), event.previousIndex, event.currentIndex);
    this.table.columnDropListDropped.emit(this.initColumns());
  }

  dropListSorted(event: CdkDragSortEvent<XTableColumn[]>) {
    const previous = this.columns()[event.previousIndex];
    const current = this.columns()[event.currentIndex];
    const middle = { left: previous.left, right: previous.right };
    previous.left = current.left;
    previous.right = current.right;
    current.left = middle.left;
    current.right = middle.right;
    moveItemInArray(this.columns(), event.previousIndex, event.currentIndex);
    this.table.detectChanges();
  }

  dragStarted(_event: CdkDragStart, column: XTableColumn) {
    column.dragging = true;
    this.table.detectChanges();
    this.table.columnDragStarted.emit(column);
  }

  dragEnded(column: XTableColumn) {
    column.dragging = false;
    this.table.detectChanges();
    this.table.columnDragEnded.emit(column);
  }
}
