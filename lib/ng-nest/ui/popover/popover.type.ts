import { InjectionToken, TemplateRef } from "@angular/core";
import { XPlacement } from "@ng-nest/ui/core";

/**
 * Popover 组件名
 * @selector x-popover
 * @decorator directive
 */
export const XPopoverPrefix = "x-popover";

export const XPopoverPortal = new InjectionToken<{}>("x-popover-portal");

/**
 * Popover @Input
 */
export interface XPopoverInput {
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
  /**
   * 显示/隐藏控制
   */
  visible?: boolean;
}

/**
 * 激活方式
 * @value "hover"
 * @value "click"
 */
export type XPopoverTrigger = "hover" | "click";

/**
 * Popover Portal 组件名
 * @selector x-popover-portal
 * @decorator component
 */
export const XPopoverPortalPrefix = "x-popover-portal";
