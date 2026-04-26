import { Component, ViewEncapsulation, ChangeDetectionStrategy, input, signal, HostBinding, effect } from '@angular/core';
import { XSplitterPanelPrefix } from './splitter.property';

/**
 * Splitter Panel
 * @selector x-splitter-panel
 * @decorator component
 */
@Component({
  selector: `${XSplitterPanelPrefix}`,
  template: '<ng-content></ng-content>',
  styleUrls: ['./splitter-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XSplitterPanelComponent {
  @HostBinding('class') className = XSplitterPanelPrefix;
  
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

  /**
   * @zh_CN 面板当前尺寸
   * @en_US Panel current size
   */
  readonly currentSize = signal<string | number | undefined>(undefined);
  
  constructor() {
    // 监听 currentSize 变化
    effect(() => {
      this.currentSize();
    });
  }

  /**
   * @zh_CN 动态样式绑定
   * @en_US Dynamic style binding
   */
  @HostBinding('style.flex')
  get flexStyle() {
    const size = this.currentSize();
    // 如果没有设置尺寸，使用 flex: 1 让面板自动分配空间
    return size ? `0 0 ${size}` : '1 1 auto';
  }
}
