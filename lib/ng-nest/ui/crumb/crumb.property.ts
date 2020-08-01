import { XData, XProperty, XDataConvert, XIdentityProperty, XTemplate, XWithConfig } from '@ng-nest/ui/core';
import { TemplateRef, Input, Output, EventEmitter, Component } from '@angular/core';

/**
 * Crumb
 * @selector x-crumb
 * @decorator component
 */
export const XCrumbPrefix = 'x-crumb';
const X_CONFIG_NAME = 'crumb';

/**
 * Crumb Property
 */
@Component({ template: '' })
export class XCrumbProperty extends XProperty {
  /**
   * @zh_CN 节点数据
   * @en_US Node data
   */
  @Input() @XDataConvert() data: XData<XCrumbNode> = [];
  /**
   * @zh_CN 节点自定义模板
   * @en_US Node custom template
   */
  @Input() nodeTpl?: TemplateRef<any>;
  /**
   * @zh_CN 分隔符
   * @en_US Separator
   */
  @Input() @XWithConfig<XTemplate>(X_CONFIG_NAME, '/') separator: XTemplate;
  /**
   * @zh_CN 节点点击事件
   * @en_US Node click event
   */
  @Output() nodeClick = new EventEmitter<XCrumbNodeClick>();
}

/**
 * @zh_CN Crumb 数据对象
 * @en_US Crumb data object
 */
export interface XCrumbNode extends XIdentityProperty {
  /**
   * @zh_CN 图标
   * @en_US Icon
   */
  icon?: string;
  /**
   * @zh_CN 禁用
   * @en_US Disabled
   */
  disabled?: boolean;
  /**
   * @zh_CN 自定义数据属性
   * @en_US Custom data attributes
   */
  [property: string]: any;
}

/**
 * @zh_CN Crumb 点击返回的对象
 * @en_US Crumb Click to return the object
 */
export interface XCrumbNodeClick {
  /**
   * @zh_CN 事件
   * @en_US event
   */
  event: Event;
  /**
   * @zh_CN 点击的节点数据
   * @en_US Clicked node data
   */
  node: XCrumbNode;
}
