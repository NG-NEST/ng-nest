import { XIdentityInput, XFormProperty, XParentIdentityInput } from '@ng-nest/ui/core';
import { InjectionToken } from '@angular/core';

/**
 * Select 组件名
 * @selector x-select
 * @decorator component
 */
export const XSelectPrefix = 'x-select';

/**
 * Select @Input
 */
export interface XSelectInput extends XIdentityInput, XFormProperty {}

/**
 * Select 数据对象
 */
export interface XSelectNode extends XParentIdentityInput {}

/**
 * Select-Portal 组件名
 * @selector x-select-portal
 * @decorator component
 */
export const XSelectPortalPrefix = 'x-select-portal';

export const XSelectPortal = new InjectionToken<{}>('x-select-portal');

/**
 * Select-Portal @Input
 */
export interface XSelectPortalInput {}
