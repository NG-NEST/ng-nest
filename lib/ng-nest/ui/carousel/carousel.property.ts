import { XProperty, XPropertyFunction, XToNumber, XToCssPixelValue, XToBoolean } from '@ng-nest/ui/core';
import { Component, input, model } from '@angular/core';
import type { XNumber, XBoolean, XShadow, XDisplayDirection, XTrigger } from '@ng-nest/ui/core';

/**
 * Carousel
 * @selector x-carousel
 * @decorator component
 */
export const XCarouselPrefix = 'x-carousel';
const X_CAROUSEL_CONFIG_NAME = 'carousel';

/**
 * Carousel Property
 */
@Component({ selector: `${XCarouselPrefix}-property`, template: '' })
export class XCarouselProperty extends XPropertyFunction(X_CAROUSEL_CONFIG_NAME) {
  /**
   * @zh_CN 当前激活的幻灯片索引
   * @en_US Index of the currently active slide
   * @example
   *
   * ```html
   * <x-carousel [active]="1" (activeChange)="activeChange($event)">
   *   <x-carousel-panel>0</x-carousel-panel>
   *   <x-carousel-panel>1</x-carousel-panel>
   * </x-carousel>
   * <x-carousel [(active)]="active">
   *   <x-carousel-panel>0</x-carousel-panel>
   *   <x-carousel-panel>1</x-carousel-panel>
   * </x-carousel>
   * ```
   *
   * ```typescript
   * active = signal(1)
   * activeChange(active: number) {
   *   console.log(active)
   * }
   * ```
   *
   */
  readonly active = model<number>(0);
  /**
   * @zh_CN 幻灯片高度
   * @en_US Slide height
   * @example
   *
   * ```html
   * <x-carousel height="18rem">
   *   <x-carousel-panel>0</x-carousel-panel>
   *   <x-carousel-panel>1</x-carousel-panel>
   * </x-carousel>
   * ```
   *
   */
  readonly height = input<string, XNumber>(this.config?.height ?? '15rem', { transform: XToCssPixelValue });
  /**
   * @zh_CN 切换器触发方式
   * @en_US Switcher trigger method
   * @example
   *
   * ```html
   * <x-carousel trigger="click">
   *   <x-carousel-panel>0</x-carousel-panel>
   *   <x-carousel-panel>1</x-carousel-panel>
   * </x-carousel>
   * ```
   *
   */
  readonly trigger = input<XCarouselTrigger>(this.config?.trigger ?? 'hover');
  /**
   * @zh_CN 箭头显示隐藏方式
   * @en_US Arrow shows how to hide
   * @example
   *
   * ```html
   * <x-carousel arrow="always">
   *   <x-carousel-panel>0</x-carousel-panel>
   *   <x-carousel-panel>1</x-carousel-panel>
   * </x-carousel>
   * <x-carousel arrow="never">
   *   <x-carousel-panel>0</x-carousel-panel>
   *   <x-carousel-panel>1</x-carousel-panel>
   * </x-carousel>
   * ```
   *
   */
  readonly arrow = input<XCarouselArrow>(this.config?.arrow ?? 'hover');
  /**
   * @zh_CN 幻灯片轮播方向
   * @en_US Slide rotation direction
   * @example
   *
   * ```html
   * <x-carousel direction="vertical">
   *   <x-carousel-panel>0</x-carousel-panel>
   *   <x-carousel-panel>1</x-carousel-panel>
   * </x-carousel>
   * ```
   *
   */
  readonly direction = input<XCarouselDirection>(this.config?.direction ?? 'horizontal');
  /**
   * @zh_CN 自动切换
   * @en_US Automatic switching
   * @example
   *
   * ```html
   * <x-carousel autoplay="false">
   *   <x-carousel-panel>0</x-carousel-panel>
   *   <x-carousel-panel>1</x-carousel-panel>
   * </x-carousel>
   * ```
   *
   */
  readonly autoplay = input<boolean, XBoolean>(true, { transform: XToBoolean });
  /**
   * @zh_CN 自动切换时间间隔，ms
   * @en_US Automatic switching time interval. ms
   * @example
   *
   * ```html
   * <x-carousel interval="5000">
   *   <x-carousel-panel>0</x-carousel-panel>
   *   <x-carousel-panel>1</x-carousel-panel>
   * </x-carousel>
   * ```
   *
   */
  readonly interval = input<number, XNumber>(3000, { transform: XToNumber });
  /**
   * @zh_CN 切换器是否显示在外面
   * @en_US Whether the switcher is displayed outside
   * @example
   *
   * ```html
   * <x-carousel outside>
   *   <x-carousel-panel>0</x-carousel-panel>
   *   <x-carousel-panel>1</x-carousel-panel>
   * </x-carousel>
   * ```
   *
   */
  readonly outside = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 是否以卡片的方式显示幻灯片
   * @en_US Whether to display the slideshow as a card
   * @example
   *
   * ```html
   * <x-carousel card>
   *   <x-carousel-panel>0</x-carousel-panel>
   *   <x-carousel-panel>1</x-carousel-panel>
   * </x-carousel>
   * ```
   *
   */
  readonly card = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 显示文字
   * @en_US Display text
   * @example
   *
   * ```html
   * <x-carousel text="text info">
   *   <x-carousel-panel>0</x-carousel-panel>
   *   <x-carousel-panel>1</x-carousel-panel>
   * </x-carousel>
   * ```
   *
   */
  readonly text = input<string>('');
  /**
   * @zh_CN 显示进度条
   * @en_US Show progress
   * @example
   *
   * ```html
   * <x-carousel progress>
   *   <x-carousel-panel>0</x-carousel-panel>
   *   <x-carousel-panel>1</x-carousel-panel>
   * </x-carousel>
   * ```
   *
   */
  readonly progress = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 进度条颜色
   * @en_US Progress color
   * @example
   *
   * ```html
   * <x-carousel progress progressColor="blue">
   *   <x-carousel-panel>0</x-carousel-panel>
   *   <x-carousel-panel>1</x-carousel-panel>
   * </x-carousel>
   * ```
   *
   */
  readonly progressColor = input<string>('');
  /**
   * @zh_CN 显示当前页面
   * @en_US Show current page
   * @example
   *
   * ```html
   * <x-carousel current>
   *   <x-carousel-panel>0</x-carousel-panel>
   *   <x-carousel-panel>1</x-carousel-panel>
   * </x-carousel>
   * ```
   *
   */
  readonly current = input<boolean, XBoolean>(false, { transform: XToBoolean });
}

/**
 * @zh_CN 指示器切换方式
 * @en_US Indicator switching method
 */
export type XCarouselTrigger = XTrigger;

/**
 * @zh_CN 切换箭头显示方式
 * @en_US Toggle arrow display
 */
export type XCarouselArrow = XShadow;

/**
 * @zh_CN 走马灯展示的方向
 * @en_US The direction of the revolving lantern
 */
export type XCarouselDirection = XDisplayDirection;

/**
 * Carousel Panel
 * @selector x-carousel-panel
 * @decorator component
 */
export const XCarouselPanelPrefix = 'x-carousel-panel';

/**
 * Carousel Panel Property
 */
@Component({ selector: `${XCarouselPanelPrefix}-property`, template: '' })
export class XCarouselPanelProperty extends XProperty {
  /**
   * @zh_CN 激活当前幻灯片
   * @en_US Activate the current slide
   * @example
   *
   * ```html
   * <x-carousel>
   *   <x-carousel-panel>0</x-carousel-panel>
   *   <x-carousel-panel active>1</x-carousel-panel>
   * </x-carousel>
   * ```
   *
   */
  readonly active = input<boolean, XBoolean>(false, { transform: XToBoolean });
}
