import { ElementRef, InjectionToken } from '@angular/core';
import type {
  XTableHeaderCellHandle,
  XTableHeaderRowDefHandle,
  XTableHeaderRowHandle,
  XTableViewCellHandle,
  XTableViewRowHandle
} from './table-view.property';

export interface XTableViewContext {
  getHeaderRows(): readonly XTableHeaderRowHandle[];
  getHeaderRowRefs(): readonly XTableHeaderRowDefHandle[];
  getHeaderCells(): readonly XTableHeaderCellHandle[];
  getCells(): readonly XTableViewCellHandle[];
  getHeaderRowRef(): XTableHeaderRowDefHandle;
  getSentinelTop(): ElementRef<HTMLElement>;
  getRows(): readonly XTableViewRowHandle[];
}

export const X_TABLE_VIEW_CONTEXT = new InjectionToken<XTableViewContext>('X_TABLE_VIEW_CONTEXT');
