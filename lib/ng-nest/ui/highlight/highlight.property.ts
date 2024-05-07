import { XProperty, XToBoolean } from '@ng-nest/ui/core';
import { Component, input } from '@angular/core';
import type { XBoolean } from '@ng-nest/ui/core';

/**
 * Highlight
 * @selector x-highlight
 * @decorator component
 */
export const XHighlightPrefix = 'x-highlight';

/**
 * Highlight Property
 */
@Component({ selector: `${XHighlightPrefix}-property`, template: '' })
export class XHighlightProperty extends XProperty {
  /**
   * @zh_CN 代码类型
   * @en_US Code type
   */
  readonly type = input<string>();
  /**
   * @zh_CN 数据
   * @en_US Data
   */
  readonly data = input<string>();
  /**
   * @zh_CN 高亮行数据
   * @en_US Highlight row data
   */
  readonly highlightLines = input<XHighlightLines>({});
  /**
   * @zh_CN 显示复制按钮
   * @en_US display copy
   */
  readonly showCopy = input<boolean, XBoolean>(false, { transform: XToBoolean });
}

/**
 * @zh_CN 高亮行数据
 * 示例：{'danger': '1, 2, 4', 'primary': '7-10, 12, 15-20'}
 * @en_US Highlight row data
 * Example：{'danger': '1, 2, 4', 'primary': '7-10, 12, 15-20'}
 */
export interface XHighlightLines {
  /**
   * @zh_CN 主色
   * @en_US Primary
   */
  primary?: string;
  /**
   * @zh_CN 成功
   * @en_US Success
   */
  success?: string;
  /**
   * @zh_CN 警告
   * @en_US Warning
   */
  warning?: string;
  /**
   * @zh_CN 危险
   * @en_US Danger
   */
  danger?: string;
  /**
   * @zh_CN 信息
   * @en_US Info
   */
  info?: string;
}
