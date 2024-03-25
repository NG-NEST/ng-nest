import { XBoolean, XInputBoolean, XProperty } from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';

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
  @Input() type?: string;
  /**
   * @zh_CN 数据
   * @en_US Data
   */
  @Input() data?: string;
  /**
   * @zh_CN 高亮行数据
   * @en_US Highlight row data
   */
  @Input() highlightLines: XHighlightLines = {};
  /**
   * @zh_CN 显示复制按钮
   * @en_US display copy
   */
  @Input() @XInputBoolean() showCopy?: XBoolean;
}

/**
 * @zh_CN 高亮行数据
 * 示例：{'danger': '1, 2, 4', 'primary': '7-10, 12, 15-20'}
 * @en_US Highlight row data
 * Example：{'danger': '1, 2, 4', 'primary': '7-10, 12, 15-20'}
 */
export type XHighlightLines = { [property: string]: string };
