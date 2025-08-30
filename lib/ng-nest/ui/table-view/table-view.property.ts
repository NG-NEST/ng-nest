import { Component, input } from '@angular/core';
import { XPropertyFunction } from '@ng-nest/ui/core';

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
export class XTableViewProperty extends XPropertyFunction(X_TABLE_VIEW_CONFIG_NAME) {
  /**
   * @zh_CN 数据
   * @en_US Row data
   */
  readonly data = input<any[]>([]);
  /**
   * @zh_CN 列数据
   * @en_US Columns data
   */
  readonly columns = input<string[]>([]);
}
