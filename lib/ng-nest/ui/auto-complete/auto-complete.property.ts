import {
  XControlValueAccessor,
  XParentIdentityProperty,
  XDataConvert,
  XInputBoolean,
  XData,
  XBoolean,
  XFormOption,
  XWithConfig,
  XPositionTopBottom,
  XNumber,
  XInputNumber
} from '@ng-nest/ui/core';
import { Input, Component, TemplateRef } from '@angular/core';

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
  @Input() @XWithConfig<number>(X_CONFIG_NAME, 200) debounceTime: number;
  /**
   * @zh_CN 展示方位
   * @en_US Display position
   */
  @Input() @XWithConfig<XPositionTopBottom>(X_CONFIG_NAME, 'bottom') placement: XPositionTopBottom;
  /**
   * @zh_CN 节点模板
   * @en_US Node template
   */
  @Input() nodeTpl: TemplateRef<any>;
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
