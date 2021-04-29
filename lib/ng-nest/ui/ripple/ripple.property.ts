import { XProperty } from '@ng-nest/ui/core';
import { Input, Directive } from '@angular/core';

/**
 * Ripple
 * @selector x-ripple
 * @decorator directive
 */
export const XRipplePrefix = 'x-ripple';

/**
 * Ripple Property
 */
@Directive({ selector: '[x-ripple]' })
export class XRippleProperty extends XProperty {}
