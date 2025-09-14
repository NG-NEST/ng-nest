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
   * @example
   *
   * ```html
   * <x-avatar label="ng-nest"></x-avatar>
   * ```
   *
   */
  readonly label = input<XTemplate>();
  /**
   * @zh_CN 尺寸
   * @en_US Size
   * @example
   *
   * ```html
   * <x-avatar size="big" icon="fto-user"></x-avatar>
   * <x-avatar size="large" icon="fto-user"></x-avatar>
   * <x-avatar size="medium"  icon="fto-user"></x-avatar>
   * <x-avatar size="small" icon="fto-user"></x-avatar>
   * <x-avatar size="mini" icon="fto-user"></x-avatar>
   * <x-avatar [size]="100" icon="fto-user"></x-avatar>
   * <x-avatar [size]="{ xs: 20, sm: 60, md: 90, lg: 120, xl: 160 }" icon="fto-user"></x-avatar>
   * ```
   *
   */
  readonly size = input<XAvatarSize>(this.config?.size ?? 'medium');
  /**
   * @zh_CN 显示图标
   * @en_US Show icon
   * @example
   *
   * ```html
   * <x-avatar icon="fto-user"></x-avatar>
   * ```
   *
   */
  readonly icon = input<string>();
  /**
   * @zh_CN 形状
   * @en_US Shape
   * @example
   *
   * ```html
   * <x-avatar icon="fto-user" shape="circle"></x-avatar>
   * <x-avatar icon="fto-user" shape="square"></x-avatar>
   * ```
   *
   */
  readonly shape = input<XAvatarShape>(this.config?.shape ?? 'circle');
  /**
   * @zh_CN 图片地址
   * @en_US The map's address
   * @example
   *
   * ```html
   * <x-avatar src="https://ngnest.com/img/logo/logo-144x144.png"></x-avatar>
   * ```
   *
   */
  readonly src = input<string>();
  /**
   * @zh_CN 图片适应方式
   * @en_US Image adaptation method
   * @example
   *
   * ```html
   * <x-avatar fit="fill" src="https://ngnest.com/img/logo/logo-144x144.png"></x-avatar>
   * <x-avatar fit="contain" src="https://ngnest.com/img/logo/logo-144x144.png"></x-avatar>
   * <x-avatar fit="cover" src="https://ngnest.com/img/logo/logo-144x144.png"></x-avatar>
   * <x-avatar fit="none" src="https://ngnest.com/img/logo/logo-144x144.png"></x-avatar>
   * <x-avatar fit="scale-down" src="https://ngnest.com/img/logo/logo-144x144.png"></x-avatar>
   * ```
   *
   */
  readonly fit = input<XAvatarFit>(this.config?.fit ?? 'cover');
  /**
   * @zh_CN 字符类型的时候左右边距
   * @en_US When the character type is the left and right distance
   * @example
   *
   * ```html
   * <x-avatar label="ng-nest" gap="5"></x-avatar>
   * <x-avatar label="ng-nest" gap="5px"></x-avatar>
   * ```
   *
   */
  readonly gap = input<string, XNumber>(this.config?.gap ?? '4px', { transform: XToCssPixelValue });
  /**
   * @zh_CN 背景颜色
   * @en_US Background color
   * @example
   *
   * ```html
   * <x-avatar label="ng-nest" backgroundColor="#999999"></x-avatar>
   * <x-avatar label="ng-nest" backgroundColor="#888888"></x-avatar>
   * ```
   *
   */
  readonly backgroundColor = input<string>(this.config?.backgroundColor ?? '#999999');
  /**
   * @zh_CN 文字颜色
   * @en_US color
   * @example
   *
   * ```html
   * <x-avatar label="ng-nest" color="#FFFFFF"></x-avatar>
   * <x-avatar label="ng-nest" color="#333333"></x-avatar>
   * ```
   *
   */
  readonly color = input<string>(this.config?.color ?? '#FFFFFF');
}

/**
 * Avatar Option
 */
export interface XAvatarOption {
  /**
   * @zh_CN 显示字符
   * @en_US Display characters
   */
  label?: XTemplate;
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  size?: XAvatarSize;
  /**
   * @zh_CN 显示图标
   * @en_US Show icon
   */
  icon?: string;
  /**
   * @zh_CN 形状
   * @en_US Shape
   */
  shape?: XAvatarShape;
  /**
   * @zh_CN 图片地址
   * @en_US The map's address
   */
  src?: string;
  /**
   * @zh_CN 图片适应方式
   * @en_US Image adaptation method
   */
  fit?: XAvatarFit;
  /**
   * @zh_CN 字符类型的时候左右边距
   * @en_US When the character type is the left and right distance
   */
  gap?: string;
  /**
   * @zh_CN 背景颜色
   * @en_US Background color
   */
  backgroundColor?: string;
  /**
   * @zh_CN 文字颜色
   * @en_US color
   */
  color?: string;
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
