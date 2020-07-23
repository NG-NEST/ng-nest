import {
  XData,
  XJustify,
  XProperty,
  XInputBoolean,
  XSize,
  XIdentityProperty,
  XTemplate,
  XInputNumber,
  XNumber,
  XBoolean,
  XWithConfig
} from '@ng-nest/ui/core';
import { Input, TemplateRef, Output, EventEmitter, Component } from '@angular/core';

/**
 * Tabs
 * @selector x-tabs
 * @decorator component
 */
export const XTabsPrefix = 'x-tabs';
const X_CONFIG_NAME = 'tabs';

/**
 * Tabs Property
 */
@Component({ template: '' })
export class XTabsProperty extends XProperty {
  /**
   * Data 数据
   */
  @Input() data: XData<XTabsNode> = [];
  /**
   * 对齐方式
   */
  @Input() justify: XJustify = 'start';
  /**
   * 样式
   */
  @Input() type?: XTabsType = 'block';
  /**
   * 布局方式
   */
  @Input() layout: XTabsLayout = 'top';
  /**
   * 激活的序号
   */
  @Input() @XInputNumber() activatedIndex: XNumber = 0;
  /**
   * 动画
   */
  @Input() @XInputBoolean() animated: XBoolean = true;
  /**
   * 节点模板
   */
  @Input() nodeTpl: TemplateRef<any>;
  /**
   * 尺寸
   */
  @Input() @XWithConfig<XSize>(X_CONFIG_NAME, 'medium') size: XSize;
  /**
   * 节点排列方式
   */
  @Input() nodeJustify: XJustify;
  /**
   * 隐藏标签栏
   */
  @Input() @XInputBoolean() sliderHidden: XBoolean;
  /**
   * 标签切换变化的事件
   */
  @Output() indexChange = new EventEmitter<XActivatedTab>();
}

/**
 * Tabs 数据对象
 */
export interface XTabsNode extends XIdentityProperty {}

/**
 * 激活的tab
 */
export interface XActivatedTab {
  activatedIndex?: number;
  activatedTab?: XTabsNode;
}

/**
 * 样式类型
 */
export type XTabsType = 'block' | 'tag' | 'card';

/**
 * 布局方式
 */
export type XTabsLayout = 'top' | 'right' | 'bottom' | 'left';

/**
 * Tab
 * @selector x-tab
 * @decorator component
 */
export const XTabPrefix = 'x-tab';

/**
 * Tab Property
 */
@Component({ template: '' })
export class XTabProperty {
  /**
   * 标签名称，支持自定义模板
   */
  @Input() label: XTemplate;
}
