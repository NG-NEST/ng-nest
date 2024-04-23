import {
  XSize,
  XTemplate,
  XProperty,
  XShape,
  XFit,
  XResponseSize,
  XNumber,
  XPropertyFunction,
  XToCssPixelValue
} from '@ng-nest/ui/core';
import { Component, input } from '@angular/core';

/**
 * Avatar
 * @selector x-avatar
 * @decorator component
 */
export const XAvatarPrefix = 'x-avatar';
export const X_AVATAR_CONFIG_NAME = 'avatar';

/**
 * Avatar Property
 */
@Component({ selector: `${XAvatarPrefix}-property`, template: '' })
export class XAvatarProperty extends XPropertyFunction(X_AVATAR_CONFIG_NAME) {
  /**
   * @zh_CN 显示字符
   * @en_US Display characters
   */
  readonly label = input<XTemplate>();
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  readonly size = input<XAvatarSize>(this.config?.size ?? 'medium');
  /**
   * @zh_CN 显示图标
   * @en_US Show icon
   */
  readonly icon = input<string>();
  /**
   * @zh_CN 形状
   * @en_US Shape
   */
  readonly shape = input<XAvatarShape>(this.config?.shape ?? 'circle');
  /**
   * @zh_CN 图片地址
   * @en_US The map's address
   */
  readonly src = input<string>();
  /**
   * @zh_CN 图片适应方式
   * @en_US Image adaptation method
   */
  readonly fit = input<XAvatarFit>(this.config?.fit ?? 'cover');
  /**
   * @zh_CN 字符类型的时候左右边距，px
   * @en_US When the character type is the left and right distance, PX
   */
  readonly gap = input<string, XNumber>(this.config?.gap ?? '4px', { transform: XToCssPixelValue });
  /**
   * @zh_CN 背景颜色
   * @en_US Background color
   */
  readonly backgroundColor = input<string>(this.config?.backgroundColor ?? '#999999');
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
