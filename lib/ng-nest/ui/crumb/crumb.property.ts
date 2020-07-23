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
   * 节点数据
   */
  @Input() @XDataConvert() data: XData<XCrumbNode> = [];
  /**
   * 节点自定义模板
   */
  @Input() nodeTpl?: TemplateRef<any>;
  /**
   * 分隔符
   */
  @Input() @XWithConfig<XTemplate>(X_CONFIG_NAME, '/') separator: XTemplate;
  /**
   * 节点点击事件
   */
  @Output() nodeClick = new EventEmitter<XCrumbNodeClick>();
}

/**
 * Crumb 数据对象
 */
export interface XCrumbNode extends XIdentityProperty {
  /**
   * 图标
   */
  icon?: string;
  /**
   * 禁用
   */
  disabled?: boolean;
  /**
   * 自定义数据属性
   */
  [property: string]: any;
}

/**
 * Crumb 点击返回的对象
 */
export interface XCrumbNodeClick {
  /**
   * 事件
   */
  event: Event;
  /**
   * 点击的节点数据
   */
  node: XCrumbNode;
}
