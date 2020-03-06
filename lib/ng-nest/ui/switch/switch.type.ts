import { XIdentityInput, XFormProperty } from '@ng-nest/ui/core';

/**
 * Switch 组件名
 * @selector x-switch
 * @decorator component
 */
export const XSwitchPrefix = 'x-switch';

/**
 * Switch @Input
 */
export interface XSwitchInput extends XIdentityInput, XFormProperty {}
