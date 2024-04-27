import { Component, input, output } from '@angular/core';
import { XProperty, XPropertyFunction, XToCssPixelValue } from '@ng-nest/ui/core';
import type { XNumber, XTemplate } from '@ng-nest/ui/core';

/**
 * Image
 * @selector x-image
 * @decorator component
 */
export const XImagePrefix = 'x-image';
const X_IMAGE_CONFIG_NAME = 'image';

/**
 * Image Property
 */
@Component({ selector: `${XImagePrefix}-property`, template: '' })
export class XImageProperty extends XPropertyFunction(X_IMAGE_CONFIG_NAME) {
  /**
   * @zh_CN 图片显示地址
   * @en_US Picture display address
   */
  readonly src = input<string>();
  /**
   * @zh_CN 图片宽度
   * @en_US Picture width
   */
  readonly width = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN 图片高度
   * @en_US Picture height
   */
  readonly height = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN 图像描述
   * @en_US Image description
   */
  readonly alt = input<string>();
  /**
   * @zh_CN 加载失败显示的地址
   * @en_US Load fault tolerance address
   */
  readonly fallback = input<string>();
  /**
   * @zh_CN 预览文字
   * @en_US Preview text
   * @default '预览'
   */
  readonly previewText = input<string>(this.config?.previewText!);
  /**
   * @zh_CN 渐进加载显示的图片
   * @en_US Gradually loaded the display of the display
   */
  readonly placeholder = input<string>();
  /**
   * @zh_CN 自定义预览操作
   * @en_US Custom preview operation
   */
  readonly previewTpl = input<XTemplate>();
  /**
   * @zh_CN 图片加载错误
   * @en_US Picture load failed
   */
  readonly error = output<ErrorEvent>();
  /**
   * @zh_CN 图片加载完成
   * @en_US Picture loading complete
   */
  readonly load = output<Event>();
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
@Component({ selector: `${XImagePreviewPrefix}-property`, template: '' })
export class XImagePreviewProperty extends XProperty {}

/**
 * Image Group
 * @selector x-image-group
 * @decorator component
 */
export const XImageGroupPrefix = 'x-image-group';
