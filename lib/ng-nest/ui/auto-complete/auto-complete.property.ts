import {
  XParentIdentityProperty,
  XDataConvert,
  XData,
  XWithConfig,
  XPositionTopBottom,
  XSize,
  XInputBoolean,
  XBoolean
} from '@ng-nest/ui/core';
import { Input, Component, TemplateRef, EventEmitter, Output } from '@angular/core';
import { XControlValueAccessor, XFormOption } from '@ng-nest/ui/base-form';

/**
 * AutoComplete
 * @selector x-auto-complete
 * @decorator component
 */
export const XAutoCompletePrefix = 'x-auto-complete';
const X_CONFIG_NAME = 'autoComplete';

/**
 * AutoComplete Property
 */
@Component({ template: '' })
export class XAutoCompleteProperty extends XControlValueAccessor<any> {
  /**
   * @zh_CN 节点数据
   * @en_US Node data
   */
  @Input() @XDataConvert() data: XData<XAutoCompleteNode> = [];
  /**
   * @zh_CN 输入延迟执行时间，ms
   * @en_US Enter a delay execution time, ms
   */
  @Input() @XWithConfig<number>(X_CONFIG_NAME, 200) debounceTime?: number;
  /**
   * @zh_CN 展示方位
   * @en_US Display position
   */
  @Input() @XWithConfig<XPositionTopBottom>(X_CONFIG_NAME, 'bottom') placement?: XPositionTopBottom;
  /**
   * @zh_CN 节点模板
   * @en_US Node template
   */
  @Input() nodeTpl?: TemplateRef<any>;
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  @Input() @XWithConfig<XSize>(X_CONFIG_NAME, 'medium') override size!: XSize;
  /**
   * @zh_CN 显示边框
   * @en_US Display Border
   */
  @Input() @XInputBoolean() @XWithConfig<XBoolean>(X_CONFIG_NAME, true) bordered!: XBoolean;
  /**
   * @zh_CN 匹配区分大小写
   * @en_US Case-sensitive
   */
  @Input() @XInputBoolean() @XWithConfig<XBoolean>(X_CONFIG_NAME, true) caseSensitive!: XBoolean;
  /**
   * @zh_CN 只能是选择的值
   * @en_US Can only be the value of choice
   */
  @Input() @XInputBoolean() @XWithConfig<XBoolean>(X_CONFIG_NAME, false) onlySelect!: XBoolean;
  /**
   * @zh_CN 选择节点事件
   * @en_US Node click event
   */
  @Output() nodeEmit = new EventEmitter<XAutoCompleteNode>();
}

/**
 * AutoComplete Option
 * @undocument true
 */
export interface XAutoCompleteOption extends XFormOption {
  /**
   * @zh_CN 节点数据
   * @en_US Node data
   */
  data?: XData<XAutoCompleteNode>;
  /**
   * @zh_CN 输入延迟执行时间，ms
   * @en_US Enter a delay execution time, ms
   */
  debounceTime?: number;
  /**
   * @zh_CN 展示方位
   * @en_US Display position
   */
  placement?: XPositionTopBottom;
  /**
   * @zh_CN 节点模板
   * @en_US Node template
   */
  nodeTpl?: TemplateRef<any>;
  /**
   * @zh_CN 选择节点事件
   * @en_US Node click event
   */
  nodeClick?: (value: XAutoCompleteNode) => void;
}

/**
 * @zh_CN AutoComplete 数据对象
 * @en_US AutoComplete data object
 */
export interface XAutoCompleteNode extends XParentIdentityProperty<XAutoCompleteNode> {}

/**
 * AutoComplete Portal
 * @selector x-auto-complete-portal
 * @decorator component
 */
export const XAutoCompletePortalPrefix = 'x-auto-complete-portal';
