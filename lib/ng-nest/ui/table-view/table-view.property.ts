import { CdkTable } from '@angular/cdk/table';
import { Component, inject } from '@angular/core';
import { XConfigService } from '@ng-nest/ui/core';

/**
 * Table view
 * @selector x-table-view
 * @decorator component
 */
export const XTableViewPrefix = 'x-table-view';
const X_TABLE_VIEW_CONFIG_NAME = 'tableView';

/**
 * Table view Property
 */
@Component({ selector: `${XTableViewPrefix}-property`, template: '' })
export class XTableViewProperty<T> extends CdkTable<T> {
  config = inject(XConfigService).getConfigForComponent(X_TABLE_VIEW_CONFIG_NAME);
}

export interface XTableHeaderRowHandle {
  listenerSticky(): void;
}

export interface XTableViewRowHandle {}

export interface XTableHeaderRowDefHandle {
  getSticky(): boolean;
  getColumns(): string[];
}
export interface XTableHeaderCellHandle {}

export interface XTableViewCellHandle {
  setActivedRow(cell: XTableViewCellHandle): void;
  setActivedColumn(cell: XTableViewCellHandle): void;
}
