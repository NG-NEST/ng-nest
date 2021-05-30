import { XProperty, XInputBoolean, XBoolean, XWithConfig, XType } from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';

/**
 * Link
 * @selector x-link
 * @decorator component
 */
export const XLinkPrefix = 'x-link';
const X_CONFIG_NAME = 'link';

/**
 * Link Property
 */
@Component({ template: '' })
export class XLinkProperty extends XProperty {
  /**
   * @zh_CN 链接
   * @en_US Link
   */
  @Input() href!: string;
  /**
   * @zh_CN 图标
   * @en_US Icon
   */
  @Input() icon!: string;
  /**
   * @zh_CN 下划线
   * @en_US Underscore
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME) @XInputBoolean() underline!: XBoolean;
  /**
   * @zh_CN 禁用
   * @en_US Disabled
   */
  @Input() @XInputBoolean() disabled!: XBoolean;
  /**
   * @zh_CN 图标靠右对齐
   * @en_US Icons are aligned to the right
   */
  @Input() @XWithConfig<XBoolean>(X_CONFIG_NAME) @XInputBoolean() iconRight!: XBoolean;
  /**
   * @zh_CN 链接类型
   * @en_US Link type
   */
  @Input() type!: XLinkType;
  /**
   * @zh_CN 打开方式
   * @en_US Open method
   */
  @Input() target!: string;
}

/**
 * @zh_CN 链接类型
 * @en_US Link type
 */
export type XLinkType = XType;
