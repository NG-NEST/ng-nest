import { XProperty, XInputNumber, XInputBoolean, XNumber, XBoolean, XWithConfig } from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';

/**
 * Icon
 * @selector x-icon
 * @decorator component
 */
export const XIconPrefix = 'x-icon';

export const XIconHref = 'https://ngnest.com/static/icons/';

/**
 * Icon Property
 */
@Component({ template: '' })
export class XIconProperty extends XProperty {
  /**
   * SVG 图标根路劲地址，可以通过全局只配置一次，所有图标资源在 github 上的 ng-nest-icon 中
   */
  @Input() @XWithConfig<string>(XIconHref) href: string;
  /**
   * 图标类型
   */
  @Input() type: string;
  /**
   * 图标颜色
   */
  @Input() color: string | string[];
  /**
   * 图标旋转角度
   */
  @Input() @XInputNumber() rotate: XNumber;
  /**
   * loading效果（图标一直旋转）
   */
  @Input() @XInputBoolean() spin: XBoolean;
  /**
   * 变化为的图标（未实现）
   */
  @Input() to: string;
}

/**
 * 图标来源
 */
export type XIconSource = 'ant-design' | 'eva' | 'feather' | 'font-awesome' | 'material-design';
