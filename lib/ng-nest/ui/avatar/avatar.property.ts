import { XSize, XTemplate, XProperty, XWithConfig, XShape, XFit, XResponseSize, XNumber, XInputNumber } from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';

/**
 * Avatar
 * @selector x-avatar
 * @decorator component
 */
export const XAvatarPrefix = 'x-avatar';
const X_CONFIG_NAME = 'avatar';

/**
 * Avatar Property
 */
@Component({ selector: `${XAvatarPrefix}-property`, template: '' })
export class XAvatarProperty extends XProperty {
  /**
   * @zh_CN 显示字符
   * @en_US Display characters
   */
  @Input() label?: XTemplate;
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  @Input() @XWithConfig<XAvatarSize>(X_CONFIG_NAME, 'medium') size?: XAvatarSize;
  /**
   * @zh_CN 显示图标
   * @en_US Show icon
   */
  @Input() icon?: string;
  /**
   * @zh_CN 形状
   * @en_US Shape
   */
  @Input() @XWithConfig<XAvatarShape>(X_CONFIG_NAME, 'circle') shape?: XAvatarShape;
  /**
   * @zh_CN 图片地址
   * @en_US The map's address
   */
  @Input() src?: string;
  /**
   * @zh_CN 图片适应方式
   * @en_US Image adaptation method
   */
  @Input() @XWithConfig<XAvatarFit>(X_CONFIG_NAME, 'cover') fit?: XAvatarFit;
  /**
   * @zh_CN 字符类型的时候左右边距，px
   * @en_US When the character type is the left and right distance, PX
   */
  @Input() @XWithConfig<XNumber>(X_CONFIG_NAME, 4) @XInputNumber() gap?: XNumber;
  /**
   * @zh_CN 背景颜色
   * @en_US Background color
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, '#999999') backgroundColor?: string;
}

/**
 * @zh_CN 头像形状
 * @en_US Avatar shape
 */
export type XAvatarShape = XShape;

/**
 * @zh_CN 当展示类型为图片的时候，设置图片如何适应容器框
 * @en_US When the display type is picture, set how the picture fits into the container frame
 */
export type XAvatarFit = XFit;

/**
 * @zh_CN 尺寸类型
 * @en_US Size type
 */
export type XAvatarSize = number | XSize | XResponseSize;

/**
 * Avatar Group
 * @selector x-avatar-group
 * @decorator component
 */
export const XAvatarGroupPrefix = 'x-avatar-group';

/**
 * Avatar Group Property
 */
@Component({ selector: `${XAvatarGroupPrefix}-property`, template: '' })
export class XAvatarGroupProperty extends XProperty {}
