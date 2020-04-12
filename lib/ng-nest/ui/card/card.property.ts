import { XTemplate, XProperty } from '@ng-nest/ui/core';
import { Input } from '@angular/core';

/**
 * Card
 * @selector x-card
 * @decorator component
 */
export const XCardPrefix = 'x-card';

/**
 * Card Property
 */
export class XCardProperty extends XProperty {
  /**
   * 卡片宽度
   */
  @Input() width?: string;
  /**
   * 内容样式
   */
  @Input() bodyStyle: { [prop: string]: string | number } = {};
  /**
   * 头部模板
   */
  @Input() header?: XTemplate;
  /**
   * 阴影显示方式
   */
  @Input() shadow: XCardShadow = 'always';
}

/**
 * 阴影显示配置
 */
export type XCardShadow = 'always' | 'hover' | 'never';
