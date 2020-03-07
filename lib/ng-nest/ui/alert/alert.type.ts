import { TemplateRef } from '@angular/core';

/**
 * Alert 组件名
 * @selector x-alert
 * @decorator component
 */
export const XAlertPrefix = 'x-alert';

/**
 * Alert @Input
 */
export interface XAlertInput {}

/**
 * 类型
 * @value "success"
 * @value "info"
 * @value "warning"
 * @value "error"
 */
export type XAlertType = 'success' | 'info' | 'warning' | 'error';
