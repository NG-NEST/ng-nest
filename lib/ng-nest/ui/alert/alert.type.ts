import { TemplateRef } from '@angular/core';
import { XStatus, XTemplate, XEffect } from '@ng-nest/ui/core';

/**
 * Alert 组件名
 * @selector x-alert
 * @decorator component
 */
export const XAlertPrefix = 'x-alert';

/**
 * Alert @Input
 */
export interface XAlertInput {
  /**
   * 隐藏
   */
  hide?: boolean;
  /**
   * 标题
   */
  title?: XTemplate;
  /**
   * 内容
   */
  content?: XTemplate;
  /**
   * 类型
   * @default 'info'
   */
  type?: XAlertType;
  /**
   * 主题
   * @default 'light'
   */
  effect?: XEffect;
  /**
   * 隐藏关闭按钮
   */
  hideClose?: boolean;
  /**
   * 关闭按钮文字替换
   */
  closeText?: string;
  /**
   * 显示图标
   */
  showIcon?: boolean;
  /**
   * 禁用动画
   */
  disabledAnimation?: boolean;
  /**
   * 延迟关闭，默认 0 表示不关闭
   * @default 0
   */
  duration?: number;
  /**
   * 关闭前的处理
   */
  beforeClose?: Function;
}

/**
 * 类型
 * @value "success"
 * @value "info"
 * @value "warning"
 * @value "error"
 */
export type XAlertType = XStatus;
