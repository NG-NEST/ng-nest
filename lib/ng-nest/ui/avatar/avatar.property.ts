import { XSize, XTemplate, XProperty, XWithConfig, XShape, XFit } from '@ng-nest/ui/core';
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
  @Input() label: XTemplate;
  /**
   * 尺寸
   */
  @Input() @XWithConfig<XSize>('medium') size: XSize;
  /**
   * 显示图标
   */
  @Input() icon: string;
  /**
   * 形状
   */
  @Input() @XWithConfig<XAvatarShape>('circle') shape: XAvatarShape;
  /**
   * 图片地址
   */
  @Input() src: string;
  /**
   * 图片适应方式
   */
  @Input() @XWithConfig<XAvatarFit>('cover') fit: XAvatarFit;
}

/**
 * 头像形状
 */
export type XAvatarShape = XShape;

/**
 * 当展示类型为图片的时候，设置图片如何适应容器框
 */
export type XAvatarFit = XFit;
