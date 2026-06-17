import {
  ElementRef,
  InjectionToken,
  InputSignal,
  InputSignalWithTransform,
  OutputEmitterRef,
  Signal,
  WritableSignal
} from '@angular/core';
import type { XBoolean, XSize, XSort, XTemplate } from '@ng-nest/ui/core';
import type { XTableCell, XTableColumn, XTableDragWidthEvent, XTableRow } from './table.property';
import type { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import type { XPaginationComponent } from '@ng-nest/ui/pagination';

export interface XTableContext {
  rowSize: InputSignal<XSize>;
  theads: WritableSignal<ElementRef<HTMLElement>[]>;
  tfoot: WritableSignal<ElementRef<HTMLElement> | null>;
  headSearchTpl: InputSignal<XTemplate | undefined>;
  checkedValues: WritableSignal<{ [prop: string]: boolean }>;
  headThTpl: InputSignal<XTemplate | undefined>;
  indeterminate: WritableSignal<string>;
  sortChange: OutputEmitterRef<XSort[]>;
  columnDragWidthMoved: OutputEmitterRef<XTableDragWidthEvent>;
  columnDragWidthStarted: OutputEmitterRef<XTableDragWidthEvent>;
  columnDragWidthEnded: OutputEmitterRef<XTableDragWidthEvent>;
  columnDropListDropped: OutputEmitterRef<XTableColumn[]>;
  columnDragStarted: OutputEmitterRef<XTableColumn>;
  columnDragEnded: OutputEmitterRef<XTableColumn>;
  treeTable: InputSignalWithTransform<boolean, XBoolean>;
  virtualBody: WritableSignal<CdkVirtualScrollViewport | null>;
  caption: Signal<ElementRef<HTMLElement> | undefined>;
  pagination: Signal<XPaginationComponent | undefined>;
  scrollContentEle: WritableSignal<HTMLElement | null>;
  table: Signal<ElementRef<HTMLElement>>;
  scrollTop: WritableSignal<number>;
  scrollLeft: WritableSignal<number>;
  scrollLeftMax: WritableSignal<boolean>;
  hasScrollY: WritableSignal<boolean>;
  scrollYWidth: WritableSignal<number>;
  hasScrollX: WritableSignal<boolean>;
  scrollXHeight: WritableSignal<number>;
  scrollXWidth: WritableSignal<number | null>;
  allowCheckRow: InputSignalWithTransform<boolean, XBoolean>;
  rowChecked: WritableSignal<XTableColumn | null>;
  showEmpty: InputSignalWithTransform<boolean, XBoolean>;
  emptyImg: InputSignal<XTemplate | undefined>;
  emptyContent: InputSignal<XTemplate | undefined>;
  checkboxDragDisabled: InputSignalWithTransform<boolean, XBoolean>;
  bodyTdTpl: InputSignal<XTemplate | undefined>;
  bodyInnerHTML: InputSignalWithTransform<boolean, XBoolean>;
  rowExpand: WritableSignal<XTableColumn | null>;

  getSticky(column: XTableColumn | XTableCell): boolean;
  getStickyLeft(column: XTableColumn | XTableCell): boolean;
  getStickyRight(column: XTableColumn | XTableCell): boolean;
  getStickyLeftLast(column: XTableColumn | XTableCell): boolean;
  getStickyRightFirst(column: XTableColumn | XTableCell): boolean;
  headChecked(checked: boolean, column: XTableColumn): void;
  checkSort(sort: XSort[]): void;
  resetScroll(x: boolean, y: boolean): void;
  bodyChecked(column: XTableColumn, row: XTableRow): void;
  setCheckbox(rows: XTableRow[], column: XTableColumn): void;
  getIndex(index: number): number;
  isExpandColumn(column: XTableColumn): boolean;
  detectChanges(): void;
}

export const X_TABLE_CONTEXT = new InjectionToken<XTableContext>('X_TABLE_CONTEXT');
