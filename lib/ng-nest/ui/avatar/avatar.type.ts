import { XSize } from '@ng-nest/ui/core';

/**
 * Avatar 组件名
 * @selector x-avatar
 * @decorator component
 */
export const XAvatarPrefix = 'x-avatar';

/**
 * Avatar @Input
 */
export interface XAvatarInput {
  /**
   * 显示字符
   */
  label?: string;
  /**
   * 尺寸
   */
  size?: XSize;
  /**
   * 显示图标
   */
  icon?: string;
  /**
   * 形状
   * @default "circle"
   */
  shape?: XAvatarShape;
  /**
   * 图片地址
   */
  src?: string;
  /**
   * 图片适应方式
   * @default "cover"
   */
  fit?: XAvatarFit;
}

/**
 * 头像形状
 * @value "circle"
 * @value "square"
 */
export type XAvatarShape = 'circle' | 'square';

/**
 * 当展示类型为图片的时候，设置图片如何适应容器框
 * @value "fill"
 * @value "contain"
 * @value "cover"
 * @value "none"
 * @value "scale-down"
 */
export type XAvatarFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
