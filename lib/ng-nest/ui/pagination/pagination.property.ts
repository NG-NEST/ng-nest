import { XPropertyFunction, XToNumber, XToBoolean, XToCssPixelValue } from '@ng-nest/ui/core';
import { Component, model, input } from '@angular/core';
import type { XSelectNode } from '@ng-nest/ui/select';
import type { XNumber, XQuery, XBoolean, XTemplate, XDataNew } from '@ng-nest/ui/core';

/**
 * Pagination
 * @selector x-pagination
 * @decorator component
 */
export const XPaginationPrefix = 'x-pagination';
const X_PAGINATION_CONFIG_NAME = 'pagination';

/**
 * @zh_CN 分页选择条数
 * @en_US Sub-selection
 */
export const XPaginationSizeData = [10, 20, 50, 100];

/**
 * Pagination Property
 */
@Component({ selector: `${XPaginationPrefix}-property`, template: '' })
export class XPaginationProperty extends XPropertyFunction(X_PAGINATION_CONFIG_NAME) {
  /**
   * @zh_CN 当前页码
   * @en_US Current page number
   */
  readonly index = model<number>(this.config?.index ?? 1);
  /**
   * @zh_CN 每页显示条数
   * @en_US Number of items displayed per page
   */
  readonly size = model<number>(this.config?.size ?? 10);
  /**
   * @zh_CN 总数
   * @en_US Total
   */
  readonly total = input<number, XNumber>(0, { transform: XToNumber });
  /**
   * @zh_CN 查询条件
   * @en_US Query conditions
   */
  readonly query = model<XQuery>({});
  /**
   * @zh_CN 最多显示的分页数量
   * @en_US The largest number of pages display
   */
  readonly pageLinkSize = input<number, XNumber>(this.config?.pageLinkSize ?? 5, { transform: XToNumber });
  /**
   * @zh_CN 显示首尾页跳转
   * @en_US Display the first and last page
   */
  readonly showEllipsis = input<boolean, XBoolean>(this.config?.showEllipsis ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 显示总条数
   * @en_US Display the total
   */
  readonly showTotal = input<boolean, XBoolean>(this.config?.showTotal ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 按钮间距
   * @en_US Button spacing
   */
  readonly space = input<string, XNumber>(this.config?.space ?? '0.25rem', { transform: XToCssPixelValue });
  /**
   * @zh_CN 添加背景色
   * @en_US Show background
   */
  readonly showBackground = input<boolean, XBoolean>(this.config?.showBackground ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 显示分页条数
   * @en_US Show size
   */
  readonly showSize = input<boolean, XBoolean>(this.config?.showSize ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 分页条数选择框的宽度
   * @en_US size with select
   */
  readonly sizeWidth = input<string, XNumber>(this.config?.sizeWidth ?? '6.875rem', { transform: XToCssPixelValue });
  /**
   * @zh_CN 显示输入分页条数（不能跟下拉选项同时使用）
   * @en_US Display the number of input page breaks (cannot exist with the drop-down options of page breaks)
   */
  readonly showInputSize = input<boolean, XBoolean>(this.config?.showInputSize ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 分页条数输入框的宽度
   * @en_US size with input
   */
  readonly inputSizeWidth = input<string, XNumber>(this.config?.sizeWidth ?? '3.125rem', {
    transform: XToCssPixelValue
  });
  /**
   * @zh_CN 分页选择的数据项
   * @en_US Paging choose items of data
   */
  readonly sizeData = input<XDataNew<XSelectNode>>(this.config?.sizeData ?? XPaginationSizeData);
  /**
   * @zh_CN 禁用整个分页
   * @en_US disabled
   */
  readonly disabled = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 显示跳转输入框
   * @en_US Show size
   */
  readonly showJump = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 跳转页的宽度
   * @en_US size with
   */
  readonly jumpWidth = input<string, XNumber>(this.config?.jumpWidth ?? '3.125rem', { transform: XToCssPixelValue });
  /**
   * @zh_CN 总数自定义模板
   * @en_US Total template
   */
  readonly totalTpl = input<XTemplate>();
  /**
   * @zh_CN 简单分页
   * @en_US Simple
   */
  readonly simple = input<boolean, XBoolean>(this.config?.simple ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 简单分页输入框宽度
   * @en_US Simple index with
   */
  readonly simpleIndexWidth = input<string, XNumber>(this.config?.simpleIndexWidth ?? '8.125rem', {
    transform: XToCssPixelValue
  });
}
