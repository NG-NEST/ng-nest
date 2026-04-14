import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

/**
 * Splitter Bar
 * @selector x-splitter-bar
 * @decorator component
 */
export const XSplitterBarPrefix = 'x-splitter-bar';

@Component({
  selector: `${XSplitterBarPrefix}`,
  template: '',
  styleUrls: ['./splitter-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XSplitterBarComponent {}
