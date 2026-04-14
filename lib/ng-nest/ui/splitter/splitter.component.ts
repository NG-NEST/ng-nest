import { Component, ViewEncapsulation, ChangeDetectionStrategy, computed, contentChildren } from '@angular/core';
import { XSplitterPrefix, XSplitterProperty } from './splitter.property';
import { XSplitterPanelComponent } from './splitter-panel.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: `${XSplitterPrefix}`,
  imports: [CommonModule],
  templateUrl: './splitter.component.html',
  styleUrls: ['./splitter.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XSplitterComponent extends XSplitterProperty {
  panels = contentChildren(XSplitterPanelComponent);

  /**
   * @zh_CN 类名映射
   * @en_US Class map
   */
  classMap = computed(() => ({
    [`${XSplitterPrefix}-${this.direction()}`]: true
  }));
}
