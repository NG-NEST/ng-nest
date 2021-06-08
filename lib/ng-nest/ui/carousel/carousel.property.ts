import {
  XProperty,
  XInputNumber,
  XInputBoolean,
  XNumber,
  XBoolean,
  XWithConfig,
  XShadow,
  XDisplayDirection,
  XTrigger
} from '@ng-nest/ui/core';
import { Input, Output, EventEmitter, Component } from '@angular/core';

/**
 * Carousel
 * @selector x-carousel
 * @decorator component
 */
export const XCarouselPrefix = 'x-carousel';
const X_CONFIG_NAME = 'carousel';

/**
 * Carousel Property
 */
@Component({ template: '' })
export class XCarouselProperty extends XProperty {
  /**
   * @zh_CN 当前激活的幻灯片索引
   * @en_US Index of the currently active slide
   */
  @Input() @XInputNumber() active: XNumber = 0;
  /**
   * @zh_CN 幻灯片高度
   * @en_US Slide height
   */
  @Input() @XWithConfig<string>(X_CONFIG_NAME, '15rem') height?: string;
  /**
   * @zh_CN 切换器触发方式
   * @en_US Switcher trigger method
   */
  @Input() @XWithConfig<XCarouselTrigger>(X_CONFIG_NAME, 'hover') trigger?: XCarouselTrigger;
  /**
   * @zh_CN 箭头显示影藏方式
   * @en_US Arrow shows how to hide
   */
  @Input() @XWithConfig<XCarouselArrow>(X_CONFIG_NAME, 'hover') arrow?: XCarouselArrow;
  /**
   * @zh_CN 幻灯片轮播方向
   * @en_US Slide rotation direction
   */
  @Input() @XWithConfig<XCarouselDirection>(X_CONFIG_NAME, 'horizontal') direction?: XCarouselDirection;
  /**
   * @zh_CN 自动切换
   * @en_US Automatic switching
   */
  @Input() @XInputBoolean() autoplay: XBoolean = true;
  /**
   * @zh_CN 自动切换时间间隔
   * @en_US Automatic switching time interval
   */
  @Input() interval: XNumber = 3000;
  /**
   * @zh_CN 切换器否显示在外面
   * @en_US Whether the switcher is displayed outside
   */
  @Input() @XInputBoolean() outside?: XBoolean;
  /**
   * @zh_CN 是否以卡片的方式显示幻灯片
   * @en_US Whether to display the slideshow as a card
   */
  @Input() @XInputBoolean() card?: XBoolean;
  /**
   * @zh_CN 激活的序号改变的事件
   * @en_US The activated sequence number changed event
   */
  @Output() activeChange = new EventEmitter<number>();
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
@Component({ template: '' })
export class XCarouselPanelProperty extends XProperty {
  /**
   * @zh_CN 激活当前幻灯片
   * @en_US Activate the current slide
   */
  @Input() @XInputBoolean() active?: XBoolean;
}
