import { XSize, XTemplate, XProperty, XWithConfig, XShape, XFit } from '@ng-nest/ui/core';
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
@Component({ template: '' })
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
  @Input() @XWithConfig<XSize>(X_CONFIG_NAME, 'medium') size?: XSize;
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
