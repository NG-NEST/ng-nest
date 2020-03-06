import { XPlacement } from '@ng-nest/ui/core';
import { TemplateRef } from '@angular/core';
import { XPopoverTrigger } from '@ng-nest/ui/popover';

/**
 * Popconfirm 组件名
 * @selector x-popconfirm
 * @decorator component
 */
export const XPopconfirmPrefix = 'x-popconfirm';

/**
 * Popconfirm @Input
 */
export interface XPopconfirmInput {
  /**
   * 标题，支持自定义模板
   */
  title?: string | TemplateRef<void>;
  /**
   * 内容，支持自定义模板
   */
  content?: string | TemplateRef<void>;
  /**
   * 底部，支持自定义模板
   */
  footer?: string | TemplateRef<void>;
  /**
   * 弹出的位置
   * @default "bottom"
   */
  placement?: XPlacement;
  /**
   * 激活方式
   * @default "hover"
   */
  trigger?: XPopoverTrigger;
  /**
   * 宽度
   * @default "10rem"
   */
  width?: string;
}
