import { XControlValueAccessor, XFormOption } from '@ng-nest/ui/core';
import { Component } from '@angular/core';

/**
 * Switch
 * @selector x-switch
 * @decorator component
 */
export const XSwitchPrefix = 'x-switch';

/**
 * Switch Property
 */
@Component({ template: '' })
export class XSwitchProperty extends XControlValueAccessor<boolean> implements XSwitchOption {}

/**
 * Switch Option
 * @undocument true
 */
export interface XSwitchOption extends XFormOption {}
