import { XProperty, XInputBoolean, XTemplate, XNumber, XBoolean } from '@ng-nest/ui/core';
import { Input, EventEmitter, Output, Component } from '@angular/core';

/**
 * Collapse
 * @selector x-collapse
 * @decorator component
 */
export const XCollapsePrefix = 'x-collapse';

/**
 * Collapse Property
 */
@Component({ template: '' })
export class XCollapseProperty extends XProperty {
  /**
   * 是否以手风琴的方式展示，只展开一个面板
   */
  @Input() @XInputBoolean() accordion: XBoolean;
  /**
   * 当前激活的面板序号
   */
  @Input() active: XNumber | XNumber[] = [];
  /**
   * 激活的面板发生变化的事件
   */
  @Output() activeChange = new EventEmitter<XNumber | XNumber[]>();
}

/**
 * Collapse Panel
 * @selector x-collapse-panel
 * @decorator component
 */
export const XCollapsePanelPrefix = 'x-collapse-panel';

/**
 * Collapse Panel Property
 */
@Component({ template: '' })
export class XCollapsePanelProperty extends XProperty {
  /**
   * 标题，支持模板自定义
   */
  @Input() label: XTemplate;
  /**
   * 激活当前面板
   */
  @Input() @XInputBoolean() active: XBoolean;
}
