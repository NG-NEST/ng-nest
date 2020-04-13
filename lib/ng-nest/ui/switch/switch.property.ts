import { XControlValueAccessor } from '@ng-nest/ui/core';
import { Renderer2, Component } from '@angular/core';

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
export class XSwitchProperty extends XControlValueAccessor<boolean> {
  constructor(public renderer: Renderer2) {
    super(renderer);
  }
}
