import { InjectionToken } from '@angular/core';

/**
 * Tooltip 组件名
 * @selector x-tooltip
 * @decorator directive
 */
export const XTooltipPrefix = 'x-tooltip';

export const XTooltipPortal = new InjectionToken<{}>('x-tooltip-portal');

/**
 * Tooltip Portal 组件名
 * @selector x-tooltip-portal
 * @decorator component
 */
export const XTooltipPortalPrefix = 'x-tooltip-portal';
