import { XTemplate, XProperty, XNumber, XShadow, XWithConfig } from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';

/**
 * Card
 * @selector x-card
 * @decorator component
 */
export const XCardPrefix = 'x-card';
const X_CONFIG_NAME = 'card';

/**
 * Card Property
 */
@Component({ selector: `${XCardPrefix}-property`, template: '', standalone: true })
export class XCardProperty extends XProperty {
  /**
   * @zh_CN 卡片宽度
   * @en_US Card width
   */
  @Input() width?: string;
  /**
   * @zh_CN 内容样式
   * @en_US Content style
   */
  @Input() bodyStyle: { [property: string]: XNumber } = {};
  /**
   * @zh_CN 头部模板
   * @en_US Head template
   */
  @Input() header?: XTemplate;
  /**
   * @zh_CN 阴影显示方式
   * @en_US Shadow display method
   */
  @Input() @XWithConfig<XCardShadow>(X_CONFIG_NAME, 'always') shadow?: XCardShadow;
}

/**
 * @zh_CN 阴影显示配置
 * @en_US Shadow display configuration
 */
export type XCardShadow = XShadow;
