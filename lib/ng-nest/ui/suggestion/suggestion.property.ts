import { Component, input, model, output } from '@angular/core';
import {
  XPropertyFunction,
  XDataArray,
  XToDataArray,
  XPlacement,
  XBoolean,
  XToBoolean,
  XNumber,
  XToCssPixelValue,
  XSize
} from '@ng-nest/ui/core';
import { XDropdownNode } from '@ng-nest/ui/dropdown';

/**
 * Suggestion
 * @selector x-suggestion
 * @decorator component
 */
export const XSuggestionPrefix = 'x-suggestion';
const X_SUGGESTION_CONFIG_NAME = 'suggestion';

/**
 * Suggestion Property
 */
@Component({ selector: `${XSuggestionPrefix}-property`, template: '' })
export class XSuggestionProperty extends XPropertyFunction(X_SUGGESTION_CONFIG_NAME) {
  /**
   * @zh_CN 建议项列表
   * @en_US Suggestion items
   */
  readonly data = input<XSuggestionNode[], XDataArray<XSuggestionNode>>([], { transform: XToDataArray });
  /**
   * @zh_CN 显示建议项
   * @en_US Show Suggestion items
   */
  readonly visible = model<boolean>(false);
  /**
   * @zh_CN 展示位置
   * @en_US Placement
   */
  readonly placement = input<XPlacement>(this.config?.placement ?? 'top-start');
  /**
   * @zh_CN 禁用
   * @en_US Disabled
   */
  readonly disabled = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 节点中已经包含子节点数据
   * @en_US The node already contains child node data
   */
  readonly children = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 弹框的最小宽度
   * @en_US Portal min-width
   */
  readonly portalMinWidth = input<string, XNumber>('10rem', { transform: XToCssPixelValue });
  /**
   * @zh_CN 弹框的最大宽度
   * @en_US Portal max-width
   */
  readonly portalMaxWidth = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN 弹框的最小高度
   * @en_US Portal min-height
   */
  readonly portalMinHeight = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN 弹框的最大高度
   * @en_US Portal max-height
   */
  readonly portalMaxHeight = input<string, XNumber>('', { transform: XToCssPixelValue });
  /**
   * @zh_CN 尺寸
   * @en_US Size
   */
  readonly size = input<XSize>(this.config?.size ?? 'medium');
  /**
   * @zh_CN 建议项点击事件
   * @en_US Suggestion item click event
   */
  readonly nodeClick = output<XSuggestionNode>();
}

/**
 * @zh_CN 建议项
 * @en_US Suggestion
 */
export interface XSuggestionNode extends XDropdownNode {}
