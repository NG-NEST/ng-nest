import { XTemplate, XProperty, XNumber, XShadow, XWithConfig } from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';

/**
 * Card
 * @selector x-card
 * @decorator component
 */
export const XCardPrefix = 'x-card';

/**
 * Card Property
 */
@Component({ template: '' })
export class XCardProperty extends XProperty {
  /**
   * 卡片宽度
   */
  @Input() width?: string;
  /**
   * 内容样式
   */
  @Input() bodyStyle: { [prop: string]: XNumber } = {};
  /**
   * 头部模板
   */
  @Input() header?: XTemplate;
  /**
   * 阴影显示方式
   */
  @Input() @XWithConfig<XCardShadow>('always') shadow: XCardShadow;
}

/**
 * 阴影显示配置
 */
export type XCardShadow = XShadow;
