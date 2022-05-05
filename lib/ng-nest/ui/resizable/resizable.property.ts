import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { XBoolean, XCorner, XInputBoolean, XInputNumber, XNumber, XPosition, XProperty } from '@ng-nest/ui/core';

/**
 * Resizable 指令名称
 * @selector x-resizable
 * @decorator Directive
 */
export const XResizablePrefix = 'x-resizable';
// const X_CONFIG_NAME = 'resizable';

/**
 * Resizable Property
 */
@Directive({ selector: '[xResizable]' })
export class XResizableProperty extends XProperty {
  /**
   * @zh_CN 启用调整尺寸大小
   * @en_US Enable adjustment size size
   */
  @Input() @XInputBoolean() xResizable: XBoolean = true;
  /**
   * @zh_CN 调整方位
   * @en_US Adjust the orientation
   */
  @Input() position?: XResizablePosition | XResizablePosition[] = 'all';
  /**
   * @zh_CN 手动调整，通过回调的数值自行调整
   * @en_US Manual adjustment, adjustment of the number of callbacks
   */
  @Input() @XInputBoolean() ghost: XBoolean = false;
  /**
   * @zh_CN 偏移屏幕左边
   * @en_US Distance on the left side
   */
  @Input() @XInputNumber() offsetLeft: XNumber = 0;
  /**
   * @zh_CN 偏移屏幕顶部
   * @en_US Distance to the top of the screen
   */
  @Input() @XInputNumber() offsetTop: XNumber = 0;
  /**
   * @zh_CN 开始调整
   * @en_US Adjust the orientation
   */
  @Output() resizeBegin: EventEmitter<any> = new EventEmitter();
  /**
   * @zh_CN 调整中
   * @en_US Adjust the orientation
   */
  @Output() resizing: EventEmitter<XResizableEvent> = new EventEmitter();
  /**
   * @zh_CN 调整结束
   * @en_US Adjust the orientation
   */
  @Output() resizeEnd: EventEmitter<XResizableEvent> = new EventEmitter();
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
  event?: MouseEvent | Touch;
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
  direction?: XResizablePosition | null;
}
