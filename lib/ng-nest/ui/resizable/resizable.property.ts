import { Directive, input, output } from '@angular/core';
import { XProperty, XToBoolean, XToCssPixelValue } from '@ng-nest/ui/core';
import type { XBoolean, XCorner, XNumber, XPosition } from '@ng-nest/ui/core';

/**
 * Resizable 指令名称
 * @selector x-resizable
 * @decorator directive
 */
export const XResizablePrefix = 'x-resizable';

/**
 * Resizable Property
 */
@Directive({ selector: '[xResizable]' })
export class XResizableProperty extends XProperty {
  /**
   * @zh_CN 启用调整尺寸大小
   * @en_US Enable adjustment size size
   */
  readonly xResizable = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 调整方位
   * @en_US Adjust the orientation
   */
  readonly position = input<XResizablePosition | XResizablePosition[]>('all');
  /**
   * @zh_CN 手动调整，通过回调的数值自行调整
   * @en_US Manual adjustment, adjustment of the number of callbacks
   */
  readonly ghost = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 偏移屏幕左边
   * @en_US Distance on the left side
   */
  readonly offsetLeft = input<string, XNumber>('0', { transform: XToCssPixelValue });
  /**
   * @zh_CN 偏移屏幕顶部
   * @en_US Distance to the top of the screen
   */
  readonly offsetTop = input<string, XNumber>('0', { transform: XToCssPixelValue });
  /**
   * @zh_CN 开始调整
   * @en_US Adjust the orientation
   */
  readonly resizeBegin = output<XResizableEvent>();
  /**
   * @zh_CN 调整中
   * @en_US Adjust the orientation
   */
  readonly resizing = output<XResizableEvent>();
  /**
   * @zh_CN 调整结束
   * @en_US Adjust the orientation
   */
  readonly resizeEnd = output<XResizableEvent>();
}

/**
 * @zh_CN 调整方位
 * @en_US Adjust the orientation
 */
export type XResizablePosition = XPosition | XCorner | 'all';

/**
 * @zh_CN 调整尺寸的事件对象
 * @en_US Adjust the size of event objects
 */
export interface XResizableEvent {
  /**
   * @zh_CN 事件
   * @en_US Event
   */
  event?: MouseEvent;
  /**
   * @zh_CN 宽度
   * @en_US Width
   */
  clientWidth?: number;
  /**
   * @zh_CN 高度
   * @en_US height
   */
  clientHeight?: number;
  /**
   * @zh_CN 距离屏幕左边
   * @en_US Distance on the left side
   */
  offsetLeft?: number;
  /**
   * @zh_CN 距离屏幕顶部
   * @en_US Distance to the top of the screen
   */
  offsetTop?: number;
  /**
   * @zh_CN 改变方位
   * @en_US Change position
   */
  direction?: XResizablePosition;
}
