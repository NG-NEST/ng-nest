import { XTemplate, XPosition } from '@ng-nest/ui/core';

/**
 * Drawer 组件名
 * @selector x-drawer
 * @decorator component
 */
export const XDrawerPrefix = 'x-drawer';

/**
 * Drawer @Input
 */
export interface XDrawerInput {
  /**
   * 标题
   */
  title?: XTemplate;
  /**
   * 显示/隐藏
   */
  visible?: boolean;
  /**
   * 展示方向
   * @defalut 'right'
   */
  placement?: XPosition;
  /**
   * 尺寸，支持固定值
   * @defalut '30%'
   */
  size?: string;
}
