import { Input, Component } from '@angular/core';
import { XProperty, XWithConfig } from '@ng-nest/ui/core';

/**
 * Image
 * @selector x-image
 * @decorator component
 */
export const XImagePrefix = 'x-image';
const X_CONFIG_NAME = 'image';

/**
 * Image Property
 */
@Component({ template: '' })
export class XImageProperty extends XProperty {
  /**
   * @zh_CN 图片显示地址
   * @en_US Picture display address
   */
  @Input() src!: string;
  /**
   * @zh_CN 图片宽度
   * @en_US Picture width
   */
  @Input() width!: string;
  /**
   * @zh_CN 图片高度
   * @en_US Picture height
   */
  @Input() height!: string;
  /**
   * @zh_CN 图像描述
   * @en_US Image description
   */
  @Input() alt!: string;
  /**
   * @zh_CN 加载失败显示的地址
   * @en_US Load fault tolerance address
   */
  @Input() fallback!: string;
  /**
   * @zh_CN 预览文字
   * @en_US Preview text
   * @default '预览'
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME) previewText?: string;
  /**
   * @zh_CN 渐进加载显示的图片
   * @en_US Gradually loaded the display of the display
   */
  @Input() placeholder?: string;
}

/**
 * @zh_CN 图片节点数据
 * @en_US Image node data
 */
export interface XImageNode {
  /**
   * @zh_CN 图片显示地址
   * @en_US Picture display address
   */
  src?: string;
  /**
   * @zh_CN 图像描述
   * @en_US Image description
   */
  alt?: string;
  /**
   * @zh_CN 加载失败显示的地址
   * @en_US Load fault tolerance address
   */
  fallback?: string;
  /**
   * @zh_CN 当前激活的图片
   * @en_US Current activated pictures
   */
  activated?: boolean;
}

/**
 * Image Preview
 * @selector x-image-preview
 * @decorator component
 */
export const XImagePreviewPrefix = 'x-image-preview';

/**
 * Image Preview Property
 */
@Component({ template: '' })
export class XImagePreviewProperty extends XProperty {}

/**
 * Image Group
 * @selector x-image-group
 * @decorator component
 */
export const XImageGroupPrefix = 'x-image-group';
