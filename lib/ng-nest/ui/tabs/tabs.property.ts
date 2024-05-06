import { XToDataNew, XPropertyFunction, XToBoolean, XToCssPixelValue } from '@ng-nest/ui/core';
import { TemplateRef, Component, input, model, output } from '@angular/core';
import type {
  XJustify,
  XSize,
  XIdentityProperty,
  XTemplate,
  XBoolean,
  XTrigger,
  XDataNew,
  XNumber
} from '@ng-nest/ui/core';

/**
 * Tabs
 * @selector x-tabs
 * @decorator component
 */
export const XTabsPrefix = 'x-tabs';
const X_TABS_CONFIG_NAME = 'tabs';

/**
 * Tabs Property
 */
@Component({ selector: `${XTabsPrefix}-property`, template: '' })
export class XTabsProperty extends XPropertyFunction(X_TABS_CONFIG_NAME) {
  /**
   * @zh_CN Data 数据
   * @en_US Data
   */
  readonly data = input<XTabsNode[], XDataNew<XTabsNode>>([], { transform: XToDataNew });
  /**
   * @zh_CN 对齐方式
   * @en_US Alignment
   */
  readonly justify = input<XJustify>('start');
  /**
   * @zh_CN 样式
   * @en_US Style
   */
  readonly type = input<XTabsType>('block');
  /**
   * @zh_CN 布局方式
   * @en_US Layout
   */
  readonly layout = input<XTabsLayout>('top');
  /**
   * @zh_CN 触发方式
   * @en_US Trigger mode
   */
  readonly trigger = input<XTabsTrigger>(this.config?.trigger ?? 'click');
  /**
   * @zh_CN 激活的序号
   * @en_US Activation number
   */
  readonly activatedIndex = model<number>(0);
  /**
   * @zh_CN 动画
   * @en_US Animation
   */
  readonly animated = input<boolean, XBoolean>(true, { transform: XToBoolean });
  /**
   * @zh_CN 节点模板
   * @en_US Node template
   */
  readonly nodeTpl = input<TemplateRef<any>>();
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  readonly size = input<XSize>(this.config?.size ?? 'medium');
  /**
   * @zh_CN 节点排列方式
   * @en_US Node arrangement
   */
  readonly nodeJustify = input<XJustify>();
  /**
   * @zh_CN 隐藏标签栏，只有一个标签页时候默认隐藏（存在自定义操作模版的时候不会）
   * @en_US Hide the label bar, there is only one tab, the default hidden
   */
  readonly sliderHidden = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 标签栏上的自定义操作模版
   * @en_US Custom template on the label bar
   */
  readonly actionTpl = input<TemplateRef<any>>();
  /**
   * @zh_CN 标签页显示不下的时候显示展开所有的按钮，布局为 top 、bottom 的时候生效
   * @en_US When the node is not displayed, display all the buttons, and the arrangement is effective when the arrangement is row
   */
  readonly showExpand = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 展开所有弹框的最大高度
   * @en_US Expand the maximum height of all bomb frames
   */
  readonly expandMaxHeight = input<string, XNumber>(this.config?.expandMaxHeight ?? '15rem', {
    transform: XToCssPixelValue
  });
  /**
   * @zh_CN angular 路由联动
   * @en_US Link angular router
   */
  readonly linkRouter = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 以严格匹配模式确定联动的路由
   * @en_US Determine the linked route in strict matching mode
   */
  readonly linkExact = input<boolean, XBoolean>(true, { transform: XToBoolean });
  /**
   * @zh_CN 标签切换变化的事件
   * @en_US Label switching event
   */
  readonly indexChange = output<XActivatedTab>();
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
 * @zh_CN 触发方式
 * @en_US Trigger method
 */
export type XTabsTrigger = XTrigger;

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
@Component({ selector: `${XTabPrefix}-property`, template: '' })
export class XTabProperty {
  /**
   * @zh_CN 标签名称，支持自定义模板
   * @en_US Label name, support custom template
   */
  readonly label = input<XTemplate>();
  /**
   * @zh_CN 禁用
   * @en_US Disabeld
   */
  readonly disabled = input<boolean, XBoolean>(false, { transform: XToBoolean });
}
