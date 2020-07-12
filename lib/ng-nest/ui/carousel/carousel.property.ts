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

/**
 * Carousel Property
 */
@Component({ template: '' })
export class XCarouselProperty extends XProperty {
  /**
   * 当前激活的幻灯片索引
   */
  @Input() @XInputNumber() active: XNumber = 0;
  /**
   * 幻灯片高度
   */
  @Input() @XWithConfig<string>('15rem') height: string;
  /**
   * 切换器触发方式
   */
  @Input() @XWithConfig<XCarouselTrigger>('hover') trigger: XCarouselTrigger;
  /**
   * 箭头显示影藏方式
   */
  @Input() @XWithConfig<XCarouselArrow>('hover') arrow: XCarouselArrow;
  /**
   * 幻灯片轮播方向
   */
  @Input() @XWithConfig<XCarouselDirection>('horizontal') direction: XCarouselDirection;
  /**
   * 自动切换
   */
  @Input() @XInputBoolean() autoplay: XBoolean = true;
  /**
   * 自动切换时间间隔
   */
  @Input() interval: XNumber = 3000;
  /**
   * 切换器否显示在外面
   */
  @Input() @XInputBoolean() outside: XBoolean;
  /**
   * 是否以卡片的方式显示幻灯片
   */
  @Input() @XInputBoolean() card: XBoolean;
  /**
   * 激活的序号改变的事件
   */
  @Output() activeChange = new EventEmitter<number>();
}

/**
 * 指示器切换方式
 */
export type XCarouselTrigger = XTrigger;

/**
 * 切换箭头显示方式
 */
export type XCarouselArrow = XShadow;

/**
 * 走马灯展示的方向
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
   * 激活当前幻灯片
   */
  @Input() @XInputBoolean() active: XBoolean;
}
