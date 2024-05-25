import { XProperty, XInputNumber, XInputBoolean, XNumber, XBoolean, XWithConfig } from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';

/**
 * Icon
 * @selector x-icon
 * @decorator component
 */
export const XIconPrefix = 'x-icon';

const X_CONFIG_NAME = 'icon';

export const XIconHref = 'https://ngnest.com/static/icons/';

/**
 * Icon Property
 */
@Component({ selector: `${XIconPrefix}-property`, template: '' })
export class XIconProperty extends XProperty {
  /**
   * @zh_CN SVG 图标根路径地址，可以通过全局只配置一次，所有图标资源在 github 上的 ng-nest-icon 中
   * @en_US The root address of the SVG icon can be configured only once globally. All icon resources are in ng-nest-icon on github
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, XIconHref) href!: string;
  /**
   * @zh_CN 图标类型
   * @en_US Icon type
   */
  @Input() type?: string;
  /**
   * @zh_CN 图标颜色
   * @en_US Icon color
   */
  @Input() color?: string;
  /**
   * @zh_CN 图标旋转角度
   * @en_US Icon rotation angle
   */
  @Input() @XInputNumber() rotate?: XNumber;
  /**
   * @zh_CN loading效果（图标一直旋转）
   * @en_US Loading effect (icon keeps rotating)
   */
  @Input() @XInputBoolean() spin?: XBoolean;
}

/**
 * @zh_CN 图标来源
 * @en_US Icon source
 */
export type XIconSource = 'ant-design' | 'eva' | 'feather' | 'font-awesome' | 'material-design';
