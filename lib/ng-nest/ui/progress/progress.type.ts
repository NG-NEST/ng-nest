import { TemplateRef } from "@angular/core";

/**
 * Progress 组件名
 * @selector x-progress
 * @decorator component
 */
export const XProgressPrefix = "x-progress";

/**
 * Progress @Input
 */
export interface XProgressInput {
  /**
   * 显示进度 0-100
   * @default 0
   */
  percent?: number;
  /**
   * 进度条高度
   * @default "0.5rem"
   */
  height?: string;
  /**
   * 状态
   * @default "normal"
   */
  status?: XProgressStatus;
  /**
   * 是否显示百分比文本
   * @default true
   */
  info?: boolean;
  /**
   * 百分比文本是否显示在进度条里面
   */
  inside?: boolean;
  /**
   * 自定义百分比文本内容
   */
  format?: Function;
  /**
   * 自定义颜色
   */
  color?: string | { color: string; percent: number }[] | Function;
}

/**
 * 进度条类型
 * @value "line"
 * @value "circle"
 * @value "dashboard"
 */
export type XProgressType = "line" | "circle" | "dashboard";

/**
 * 状态
 * @value "normal"
 * @value "active"
 * @value "success"
 * @value "exception"
 * @value "warning"
 */
export type XProgressStatus = "normal" | "active" | "success" | "exception" | "warning";
