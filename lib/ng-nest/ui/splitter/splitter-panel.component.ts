import { Component, ViewEncapsulation, ChangeDetectionStrategy, input } from '@angular/core';

/**
 * Splitter Panel
 * @selector x-splitter-panel
 * @decorator component
 */
export const XSplitterPanelPrefix = 'x-splitter-panel';

@Component({
  selector: `${XSplitterPanelPrefix}`,
  template: '<ng-content></ng-content>',
  styleUrls: ['./splitter-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XSplitterPanelComponent {
  /**
   * @zh_CN 面板最小尺寸
   * @en_US Panel minimum size
   */
  readonly min = input<string | number>('0');

  /**
   * @zh_CN 面板最大尺寸
   * @en_US Panel maximum size
   */
  readonly max = input<string | number>('100%');

  /**
   * @zh_CN 面板默认尺寸
   * @en_US Panel default size
   */
  readonly size = input<string | number>();
}
