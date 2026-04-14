import { Component, input } from '@angular/core';
import { XToNumber, XToBoolean, XPropertyFunction } from '@ng-nest/ui/core';
import type { XNumber, XBoolean } from '@ng-nest/ui/core';

/**
 * Watermark
 * @selector x-watermark
 * @decorator component
 */
export const XWatermarkPrefix = 'x-watermark';
const X_WATERMARK_CONFIG_NAME = 'watermark';

/**
 * Watermark Property
 */
@Component({ selector: `${XWatermarkPrefix}-property`, template: '' })
export class XWatermarkProperty extends XPropertyFunction(X_WATERMARK_CONFIG_NAME) {
  /**
   * @zh_CN 水印内容
   * @en_US Watermark content
   * @example
   *
   * ```html
   * <x-watermark content="NG-NEST"></x-watermark>
   * ```
   *
   */
  readonly content = input<string>('');
  /**
   * @zh_CN 水印宽度
   * @en_US Watermark width
   * @example
   *
   * ```html
   * <x-watermark [width]="120"></x-watermark>
   * ```
   *
   */
  readonly width = input<number, XNumber>(this.config?.width ?? 120, { transform: XToNumber });
  /**
   * @zh_CN 水印高度
   * @en_US Watermark height
   * @example
   *
   * ```html
   * <x-watermark [height]="60"></x-watermark>
   * ```
   *
   */
  readonly height = input<number, XNumber>(this.config?.height ?? 60, { transform: XToNumber });
  /**
   * @zh_CN 旋转角度
   * @en_US Rotation angle
   * @example
   *
   * ```html
   * <x-watermark [rotate]="-22"></x-watermark>
   * <x-watermark [rotate]="0"></x-watermark>
   * ```
   *
   */
  readonly rotate = input<number, XNumber>(this.config?.rotate ?? -22, { transform: XToNumber });
  /**
   * @zh_CN 字体大小
   * @en_US Font size
   * @example
   *
   * ```html
   * <x-watermark [fontSize]="14"></x-watermark>
   * ```
   *
   */
  readonly fontSize = input<number, XNumber>(this.config?.fontSize ?? 14, { transform: XToNumber });
  /**
   * @zh_CN 字体
   * @en_US Font family
   * @example
   *
   * ```html
   * <x-watermark fontFamily="Varela Round"></x-watermark>
   * ```
   *
   */
  readonly fontFamily = input<string>(this.config?.fontFamily ?? 'Varela Round');
  /**
   * @zh_CN 字体颜色
   * @en_US Font color
   * @example
   *
   * ```html
   * <x-watermark color="rgba(0, 0, 0, 0.12)"></x-watermark>
   * ```
   *
   */
  readonly color = input<string>(this.config?.color ?? 'rgba(0, 0, 0, 0.12)');
  /**
   * @zh_CN 层级
   * @en_US Z-index
   * @example
   *
   * ```html
   * <x-watermark [zIndex]="9999"></x-watermark>
   * ```
   *
   */
  readonly zIndex = input<number, XNumber>(this.config?.zIndex ?? 9999, { transform: XToNumber });
  /**
   * @zh_CN 透明度
   * @en_US Opacity
   * @example
   *
   * ```html
   * <x-watermark [alpha]="1"></x-watermark>
   * <x-watermark [alpha]="0.5"></x-watermark>
   * ```
   *
   */
  readonly alpha = input<number, XNumber>(this.config?.alpha ?? 1, { transform: XToNumber });
  /**
   * @zh_CN 水平间距
   * @en_US Horizontal gap
   * @example
   *
   * ```html
   * <x-watermark [gapX]="100"></x-watermark>
   * ```
   *
   */
  readonly gapX = input<number, XNumber>(this.config?.gapX ?? 100, { transform: XToNumber });
  /**
   * @zh_CN 垂直间距
   * @en_US Vertical gap
   * @example
   *
   * ```html
   * <x-watermark [gapY]="100"></x-watermark>
   * ```
   *
   */
  readonly gapY = input<number, XNumber>(this.config?.gapY ?? 100, { transform: XToNumber });
  /**
   * @zh_CN 水平偏移
   * @en_US Horizontal offset
   * @example
   *
   * ```html
   * <x-watermark [offsetLeft]="0"></x-watermark>
   * ```
   *
   */
  readonly offsetLeft = input<number, XNumber>(this.config?.offsetLeft ?? 0, { transform: XToNumber });
  /**
   * @zh_CN 垂直偏移
   * @en_US Vertical offset
   * @example
   *
   * ```html
   * <x-watermark [offsetTop]="0"></x-watermark>
   * ```
   *
   */
  readonly offsetTop = input<number, XNumber>(this.config?.offsetTop ?? 0, { transform: XToNumber });
  /**
   * @zh_CN 是否交错显示
   * @en_US Whether to stagger display
   * @example
   *
   * ```html
   * <x-watermark [striped]="true"></x-watermark>
   * <x-watermark [striped]="false"></x-watermark>
   * ```
   *
   */
  readonly striped = input<boolean, XBoolean>(this.config?.striped ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 是否禁用
   * @en_US Whether to disable
   * @example
   *
   * ```html
   * <x-watermark [disabled]="true"></x-watermark>
   * <x-watermark [disabled]="false"></x-watermark>
   * ```
   *
   */
  readonly disabled = input<boolean, XBoolean>(this.config?.disabled ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 图片/图标 URL
   * @en_US Image/icon URL
   * @example
   *
   * ```html
   * <x-watermark imageSrc="/assets/logo.png"></x-watermark>
   * ```
   *
   */
  readonly imageSrc = input<string>('');
  /**
   * @zh_CN 图片宽度
   * @en_US Image width
   * @example
   *
   * ```html
   * <x-watermark [imageWidth]="40"></x-watermark>
   * ```
   *
   */
  readonly imageWidth = input<number, XNumber>(0, { transform: XToNumber });
  /**
   * @zh_CN 图片高度
   * @en_US Image height
   * @example
   *
   * ```html
   * <x-watermark [imageHeight]="40"></x-watermark>
   * ```
   *
   */
  readonly imageHeight = input<number, XNumber>(0, { transform: XToNumber });
  /**
   * @zh_CN 图片相对文本的位置
   * @en_US Image position relative to text
   * @example
   *
   * ```html
   * <x-watermark imagePosition="top"></x-watermark>
   * <x-watermark imagePosition="center"></x-watermark>
   * <x-watermark imagePosition="bottom"></x-watermark>
   * ```
   *
   */
  readonly imagePosition = input<'top' | 'center' | 'bottom'>('center');
}
