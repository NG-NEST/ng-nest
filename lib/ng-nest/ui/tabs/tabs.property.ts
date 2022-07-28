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
   * @zh_CN Data 数据
   * @en_US Data
   */
  @Input() data: XData<XTabsNode> = [];
  /**
   * @zh_CN 对齐方式
   * @en_US Alignment
   */
  @Input() justify: XJustify = 'start';
  /**
   * @zh_CN 样式
   * @en_US Style
   */
  @Input() type: XTabsType = 'block';
  /**
   * @zh_CN 布局方式
   * @en_US Layout
   */
  @Input() layout: XTabsLayout = 'top';
  /**
   * @zh_CN 激活的序号
   * @en_US Activation number
   */
  @Input() @XInputNumber() activatedIndex: XNumber = 0;
  /**
   * @zh_CN 动画
   * @en_US Animation
   */
  @Input() @XInputBoolean() animated: XBoolean = true;
  /**
   * @zh_CN 节点模板
   * @en_US Node template
   */
  @Input() nodeTpl!: TemplateRef<any>;
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  @Input() @XWithConfig<XSize>(X_CONFIG_NAME, 'medium') size?: XSize;
  /**
   * @zh_CN 节点排列方式
   * @en_US Node arrangement
   */
  @Input() nodeJustify?: XJustify;
  /**
   * @zh_CN 隐藏标签栏，只有一个标签页时候默认隐藏（存在自定义操作模版的时候不会）
   * @en_US Hide the label bar, there is only one tab, the default hidden
   */
  @Input() @XInputBoolean() sliderHidden?: XBoolean;
  /**
   * @zh_CN 标签栏上的自定义操作模版
   * @en_US Custom template on the label bar
   */
  @Input() actionTpl?: TemplateRef<void>;
  /**
   * @zh_CN 标签切换变化的事件
   * @en_US Label switching event
   */
  @Output() indexChange = new EventEmitter<XActivatedTab>();
}

/**
 * @zh_CN Tabs 数据对象
 * @en_US Tabs data object
 */
export interface XTabsNode extends XIdentityProperty {
  /**
   * @zh_CN 禁用节点
   * @en_US Node disabled
   */
  disabled?: boolean;
  /**
   * @zh_CN 自定义属性
   * @en_US Custom properties
   */
  [property: string]: any;
}

/**
 * @zh_CN 激活的tab
 * @en_US Active tab
 */
export interface XActivatedTab {
  activatedIndex?: number;
  activatedTab?: XTabsNode;
}

/**
 * @zh_CN 样式类型
 * @en_US Style type
 */
export type XTabsType = 'block' | 'tag' | 'card';

/**
 * @zh_CN 布局方式
 * @en_US Layout
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
   * @zh_CN 标签名称，支持自定义模板
   * @en_US Label name, support custom template
   */
  @Input() label?: XTemplate;
  /**
   * @zh_CN 禁用
   * @en_US Disabeld
   */
  @Input() @XInputBoolean() disabled?: XBoolean;
}
