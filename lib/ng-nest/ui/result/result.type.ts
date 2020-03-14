import { TemplateRef } from '@angular/core';
import { XStatus } from '../core';

/**
 * Result 组件名
 * @selector x-result
 * @decorator component
 */
export const XResultPrefix = 'x-result';

/**
 * Result @Input
 */
export interface XResultInput {}

/**
 * 结果状态
 */
export type XResultStatus = XStatus | '403' | '404' | '500' | 'custom';
