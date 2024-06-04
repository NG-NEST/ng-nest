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
   * @example
   *
   * ```html
   * <x-image
   *   width="100px"
   *   height="100px"
   *   src="https://ngnest.com/static/docs/course/rbac/1-introduction/demo/1__ng-nest-admin/light.png"
   * ></x-image>
   * ```
   *
   */
  readonly src = input<string>();
  /**
   * @zh_CN 图片宽度
   * @en_US Picture width
   * @example
   *
   * ```html
   * <x-image
   *   width="100px"
   *   height="100px"
   *   src="https://ngnest.com/static/docs/course/rbac/1-introduction/demo/1__ng-nest-admin/light.png"
   * ></x-image>
   * ```
   *
   */
  readonly width = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN 图片高度
   * @en_US Picture height
   * @example
   *
   * ```html
   * <x-image
   *   width="100px"
   *   height="100px"
   *   src="https://ngnest.com/static/docs/course/rbac/1-introduction/demo/1__ng-nest-admin/light.png"
   * ></x-image>
   * ```
   *
   */
  readonly height = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN 图像描述
   * @en_US Image description
   * @example
   *
   * ```html
   * <x-image
   *   alt="ng-nest-admin-light"
   *   width="100px"
   *   height="100px"
   *   src="https://ngnest.com/static/docs/course/rbac/1-introduction/demo/1__ng-nest-admin/light.png"
   * ></x-image>
   * ```
   *
   */
  readonly alt = input<string>();
  /**
   * @zh_CN 加载失败显示的地址
   * @en_US Load fault tolerance address
   * @example
   *
   * ```html
   * <x-image
   *   width="100px"
   *   height="100px"
   *   src="error"
   *   fallback="data:image/png;base64,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"
   * ></x-image>
   * ```
   *
   */
  readonly fallback = input<string>();
  /**
   * @zh_CN 预览文字
   * @en_US Preview text
   * @default '预览'
   * @example
   *
   * ```html
   * <x-image
   *   width="100px"
   *   height="100px"
   *   src="https://ngnest.com/static/docs/course/rbac/1-introduction/demo/1__ng-nest-admin/light.png"
   *   previewText="查看"
   * ></x-image>
   * ```
   *
   */
  readonly previewText = input<string>(this.config?.previewText!);
  /**
   * @zh_CN 渐进加载显示的图片地址
   * @en_US Progressive loading image addresses
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
   * @example
   *
   * ```html
   * <x-image
   *   width="100px"
   *   height="100px"
   *   src="error"
   *   (error)="onError($event)"
   * ></x-image>
   * ```
   *
   * ```typescript
   * onError(event: ErrorEvent) {
   *   console.log(event)
   * }
   * ```
   *
   */
  readonly error = output<ErrorEvent>();
  /**
   * @zh_CN 图片加载完成
   * @en_US Picture loading complete
   * @example
   *
   * ```html
   * <x-image
   *   width="100px"
   *   height="100px"
   *   src="https://ngnest.com/static/docs/course/rbac/1-introduction/demo/1__ng-nest-admin/light.png"
   *   (load)="onLoad($event)"
   * ></x-image>
   * ```
   *
   * ```typescript
   * onLoad(event: Event) {
   *   console.log(event)
   * }
   * ```
   *
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
