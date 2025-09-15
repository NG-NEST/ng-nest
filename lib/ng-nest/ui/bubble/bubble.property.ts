import { Component, input } from '@angular/core';
import { XBoolean, XNumber, XPropertyFunction, XSize, XTemplate, XToBoolean, XToNumber } from '@ng-nest/ui/core';
import { XAvatarOption } from '@ng-nest/ui/avatar';

/**
 * Bubble
 * @selector x-bubble
 * @decorator component
 */
export const XBubblePrefix = 'x-bubble';
const X_BUBBLE_CONFIG_NAME = 'bubble';

/**
 * Bubble Property
 */
@Component({ selector: `${XBubblePrefix}-property`, template: '' })
export class XBubbleProperty extends XPropertyFunction(X_BUBBLE_CONFIG_NAME) {
  /**
   * @zh_CN 气泡内容
   * @en_US Bubble content
   */
  readonly content = input<string>();
  /**
   * @zh_CN 头像
   * @en_US Avatar
   */
  readonly avatar = input<XAvatarOption>();
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  readonly size = input<XSize>(this.config?.size ?? 'medium');
  /**
   * @zh_CN 形态变体
   * @en_US Bubble variant
   */
  readonly variant = input<XBubbleVariant>(this.config?.variant ?? 'outlined');
  /**
   * @zh_CN 位置
   * @en_US Bubble placement
   */
  readonly placement = input<XBubblePlacement>('start');
  /**
   * @zh_CN 气泡头部内容
   * @en_US Bubble header content
   */
  readonly header = input<XTemplate>();
  /**
   * @zh_CN 气泡底部内容
   * @en_US Bubble header content
   */
  readonly footer = input<XTemplate>();
  /**
   * @zh_CN 加载中
   * @en_US Loading
   */
  readonly loading = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 内容输出打字机效果
   * @en_US Typing effect
   */
  readonly typing = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 打字机输出速度
   * @en_US Typing speed
   */
  readonly speed = input<number, XNumber>(30, { transform: XToNumber });
  /**
   * @zh_CN 内容渲染器，可自定义内容的渲染方式，如 HTML、Markdown
   * @en_US Content renderer, can customize content rendering, such as HTML, Markdown
   */
  readonly renderer = input<XBubbleContentRenderer>();
  /**
   * @zh_CN 是否显示打字机光标
   * @en_US Whether to show the typing cursor
   */
  readonly showCursor = input<boolean, XBoolean>(false, { transform: XToBoolean });
}

/**
 * Bubbles
 * @selector x-bubbles
 * @decorator component
 */
export const XBubblesPrefix = 'x-bubbles';
const X_BUBBLES_CONFIG_NAME = 'bubbles';

/**
 * Bubbles Property
 */
@Component({ selector: `${XBubblesPrefix}-property`, template: '' })
export class XBubblesProperty extends XPropertyFunction(X_BUBBLES_CONFIG_NAME) {
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  readonly size = input<XSize>();
  /**
   * @zh_CN 形态变体
   * @en_US Bubble variant
   */
  readonly variant = input<XBubbleVariant>();
}

/**
 * @zh_CN 形态变体
 * @en_US Bubble variant
 */
export type XBubbleVariant = 'outlined' | 'filled' | 'shadow' | 'borderless';

/**
 * @zh_CN 位置
 * @en_US Bubble placement
 */
export type XBubblePlacement = 'start' | 'end';

/**
 * @zh_CN 内容渲染函数
 * @en_US Bubble content renderer
 */
export type XBubbleContentRenderer = (content: string) => string | undefined;
