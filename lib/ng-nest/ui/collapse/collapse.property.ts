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
   * @zh_CN 是否以手风琴的方式展示，只展开一个面板
   * @en_US Whether to display as an accordion, only expand one panel
   */
  @Input() @XInputBoolean() accordion: XBoolean;
  /**
   * @zh_CN 当前激活的面板序号
   * @en_US The serial number of the currently active panel
   */
  @Input() active: XNumber | XNumber[] = [];
  /**
   * @zh_CN 激活的面板发生变化的事件
   * @en_US The event that the activated panel changes
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
   * @zh_CN 标题，支持模板自定义
   * @en_US Title, support template customization
   */
  @Input() label: XTemplate;
  /**
   * @zh_CN 激活当前面板
   * @en_US Activate the current panel
   */
  @Input() @XInputBoolean() active: XBoolean;
}
