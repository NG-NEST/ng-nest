import { XPropertyFunction, XToCssPixelValue } from '@ng-nest/ui/core';
import { Component, input } from '@angular/core';
import type { XTemplate, XNumber, XShadow } from '@ng-nest/ui/core';

/**
 * Card
 * @selector x-card
 * @decorator component
 */
export const XCardPrefix = 'x-card';
const X_CARD_CONFIG_NAME = 'card';

/**
 * Card Property
 */
@Component({ selector: `${XCardPrefix}-property`, template: '' })
export class XCardProperty extends XPropertyFunction(X_CARD_CONFIG_NAME) {
  /**
   * @zh_CN 卡片宽度
   * @en_US Card width
   */
  readonly width = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN 内容样式
   * @en_US Content style
   */
  readonly bodyStyle = input<XCardBodyStyle>({});
  /**
   * @zh_CN 头部模板
   * @en_US Head template
   */
  readonly header = input<XTemplate>();
  /**
   * @zh_CN 阴影显示方式
   * @en_US Shadow display method
   */
  readonly shadow = input<XCardShadow>(this.config?.shadow ?? 'always');
}

/**
 * @zh_CN 阴影显示配置
 * @en_US Shadow display configuration
 */
export type XCardShadow = XShadow;

/**
 * @zh_CN 卡片内容样式类型
 * @en_US Card content style type
 */
export type XCardBodyStyle = { [property: string]: XNumber };
