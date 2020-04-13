import { XSize, XTemplate, XProperty } from '@ng-nest/ui/core';
import { Input, Component } from '@angular/core';

/**
 * Avatar
 * @selector x-avatar
 * @decorator component
 */
export const XAvatarPrefix = 'x-avatar';

/**
 * Avatar Property
 */
@Component({ template: '' })
export class XAvatarProperty extends XProperty {
  /**
   * 显示字符
   */
  @Input() label?: XTemplate;
  /**
   * 尺寸
   */
  @Input() size?: XSize = 'medium';
  /**
   * 显示图标
   */
  @Input() icon?: string;
  /**
   * 形状
   */
  @Input() shape?: XAvatarShape = 'circle';
  /**
   * 图片地址
   */
  @Input() src?: string;
  /**
   * 图片适应方式
   */
  @Input() fit?: XAvatarFit = 'cover';
}

/**
 * 头像形状
 */
export type XAvatarShape = 'circle' | 'square';

/**
 * 当展示类型为图片的时候，设置图片如何适应容器框
 */
export type XAvatarFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
