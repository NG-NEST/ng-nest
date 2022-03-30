import { Directive, Input } from '@angular/core';
import { XCorner, XPosition, XProperty } from '@ng-nest/ui/core';

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
@Directive({ selector: '[x-resizable]' })
export class XResizableProperty extends XProperty {
  /**
   * @zh_CN 调整方位
   * @en_US Adjust the orientation
   */
  @Input() position?: XResizablePosition | XResizablePosition[] = 'all';
}

/**
 * @zh_CN 调整方位
 * @en_US Adjust the orientation
 */
export type XResizablePosition = XPosition | XCorner | 'all';
