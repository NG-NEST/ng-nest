import { Component, input } from '@angular/core';
import { XPropertyFunction, XToNumber, XToBoolean, XToCssPixelValue } from '@ng-nest/ui/core';
import type { XDirection, XSize, XNumber, XBoolean, XType } from '@ng-nest/ui/core';

/**
 * Button
 * @selector x-button
 * @decorator component
 */
export const XButtonPrefix = 'x-button';
const X_BUTTON_CONFIG_NAME = 'button';

/**
 * Button Property
 */
@Component({ selector: `${XButtonPrefix}-property`, template: '' })
export class XButtonProperty extends XPropertyFunction(X_BUTTON_CONFIG_NAME) {
  /**
   * @zh_CN 按钮类型
   * @en_US Button type
   * @example
   *
   * ```html
   * <x-button>Initial</x-button>
   * <x-button type="primary">Primary</x-button>
   * <x-button type="success">Success</x-button>
   * <x-button type="warning">Warning</x-button>
   * <x-button type="danger">Danger</x-button>
   * <x-button type="info">Info</x-button>
   * <x-button [type]="'primary'">Primary</x-button>
   * ```
   *
   */
  readonly type = input<XButtonType>(this.config?.type ?? 'initial');
  /**
   * @zh_CN 图标
   * @en_US Icon
   * @example
   *
   * ```html
   * <x-button icon="fto-edit"></x-button>
   * <x-button icon="fto-edit">Edit</x-button>
   * <x-button [icon]="'fto-edit'">Edit</x-button>
   * ```
   *
   */
  readonly icon = input<string>('');
  /**
   * @zh_CN 提示
   * @en_US Title
   * @example
   *
   * ```html
   * <x-button title="information"></x-button>
   * <x-button [title]="'information'"></x-button>
   * ```
   *
   */
  readonly title = input<string>('');
  /**
   * @zh_CN 按钮中元素的布局方式
   * @en_US Button elements in the layout
   * @example
   *
   * ```html
   * <x-button direction="column" icon="edit">Button</x-button>
   * <x-button direction="column-reverse" icon="edit">Button</x-button>
   * <x-button direction="row" icon="edit">Button</x-button>
   * <x-button direction="row-reverse" icon="edit">Button</x-button>
   * <x-button [direction]="row" icon="edit">Button</x-button>
   * ```
   *
   */
  readonly direction = input<XDirection>('row');
  /**
   * @zh_CN tab 键控制次序
   * @en_US Tab key control order
   * @example
   *
   * ```html
   * <x-button tabindex="0"></x-button>
   * <x-button [tabindex]="0"></x-button>
   * ```
   *
   */
  readonly tabindex = input<number, XNumber>(0, { transform: XToNumber });
  /**
   * @zh_CN 尺寸
   * @en_US Size
   * @example
   *
   * ```html
   * <x-button size="big">Big</x-button>
   * <x-button size="large">Large</x-button>
   * <x-button size="medium">Medium</x-button>
   * <x-button size="small">Small</x-button>
   * <x-button size="mini">Mini</x-button>
   * <x-button [size]="'medium'">Medium</x-button>
   * ```
   *
   */
  readonly size = input<XSize>(this.config?.size ?? 'medium');
  /**
   * @zh_CN 仅显示图标
   * @en_US Icon only
   * @example
   *
   * ```html
   * <x-button icon="fto-edit" onlyIcon></x-button>
   * <x-button icon="fto-edit" onlyIcon="true"></x-button>
   * <x-button icon="fto-edit" [onlyIcon]="true"></x-button>
   * ```
   *
   */
  readonly onlyIcon = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 激活的按钮（样式差异）
   * @en_US Active button (style difference)
   * @example
   *
   * ```html
   * <x-button activated>Button</x-button>
   * <x-button activated="true">Button</x-button>
   * <x-button [activated]="true">Button</x-button>
   * ```
   *
   */
  readonly activated = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 禁用按钮
   * @en_US Disable button
   * @example
   *
   * ```html
   * <x-button disabled>Button</x-button>
   * <x-button disabled="true">Button</x-button>
   * <x-button [disabled]="true">Button</x-button>
   * ```
   *
   */
  readonly disabled = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 朴素按钮
   * @en_US Plain button
   * @example
   *
   * ```html
   * <x-button plain>Button</x-button>
   * <x-button plain="true">Button</x-button>
   * <x-button [plain]="true">Button</x-button>
   * ```
   *
   */
  readonly plain = input<boolean, XBoolean>(this.config?.plain ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 平铺按钮
   * @en_US Flat button
   * @example
   *
   * ```html
   * <x-button flat>Button</x-button>
   * <x-button flat="true">Button</x-button>
   * <x-button [flat]="true">Button</x-button>
   * ```
   *
   */
  readonly flat = input<boolean, XBoolean>(this.config?.flat ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 文字按钮
   * @en_US Text button
   * @example
   *
   * ```html
   * <x-button text>Button</x-button>
   * <x-button text="true">Button</x-button>
   * <x-button [text]="true">Button</x-button>
   * ```
   *
   */
  readonly text = input<boolean, XBoolean>(this.config?.text ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 圆角按钮
   * @en_US Round button
   * @example
   *
   * ```html
   * <x-button round>Button</x-button>
   * <x-button round="true">Button</x-button>
   * <x-button [round]="true">Button</x-button>
   * ```
   *
   */
  readonly round = input<boolean, XBoolean>(this.config?.round ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 圆型按钮（配合图标来使用）
   * @en_US Round button (use with icon)
   * @example
   *
   * ```html
   * <x-button circle>Button</x-button>
   * <x-button circle="true">Button</x-button>
   * <x-button [circle]="true">Button</x-button>
   * ```
   *
   */
  readonly circle = input<boolean, XBoolean>(this.config?.circle ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 加载中
   * @en_US Loading
   * @example
   *
   * ```html
   * <x-button loading>Button</x-button>
   * <x-button loading="true">Button</x-button>
   * <x-button [loading]="true">Button</x-button>
   * ```
   *
   */
  readonly loading = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 关闭按钮
   * @en_US Close button
   * @example
   *
   * ```html
   * <x-button closable>Button</x-button>
   * <x-button closable="true">Button</x-button>
   * <x-button [closable]="true">Button</x-button>
   * ```
   *
   */
  readonly closable = input<boolean, XBoolean>(false, { transform: XToBoolean });
  /**
   * @zh_CN 按钮类型属性 submit, button, reset
   * @en_US Button type attribute. submit, button, reset
   * @example
   *
   * ```html
   * <x-button attrType="button">Button</x-button>
   * <x-button attrType="submit">Button</x-button>
   * <x-button attrType="reset">Button</x-button>
   * ```
   *
   */
  readonly attrType = input<XButtonAttrType>(this.config?.attrType ?? 'button');
}

/**
 * @zh_CN 按钮类型
 * @en_US Button type
 */
export type XButtonType = XType;

/**
 * @zh_CN 按钮类型属性
 * - `'submit'` : 此类型用于提交表单数据
 * - `'reset'` : 此类型用于重置表单中的数据
 * - `'button'` : 此类型用于自定义按钮行为
 * @en_US Button attr type
 * - `'submit'` : This type is used to submit the form data
 * - `'reset'` : This type is used to reset the form data
 * - `'button'` : This type is used to the custom button
 */
export type XButtonAttrType = 'submit' | 'button' | 'reset';

/**
 * Buttons
 * @selector x-buttons
 * @decorator component
 */
export const XButtonsPrefix = 'x-buttons';
const X_BUTTONS_CONFIG_NAME = 'buttons';

/**
 * Buttons Property
 */
@Component({ selector: `${XButtonsPrefix}-property`, template: '' })
export class XButtonsProperty extends XPropertyFunction(X_BUTTONS_CONFIG_NAME) {
  /**
   * @zh_CN 按钮间距
   * @en_US Button spacing
   * @example
   *
   * ```html
   * // ex: 10,'10px','1rem'
   * <x-buttons space="1rem">
   *  <x-button>Button1</button>
   *  <x-button>Button2</button>
   * </x-buttons>
   * ```
   *
   */
  readonly space = input<string, XNumber>(this.config?.space ?? '', { transform: XToCssPixelValue });
  /**
   * @zh_CN 隐藏边框
   * @en_US Hide border
   * @example
   *
   * ```html
   * <x-buttons hiddenBorder>
   *  <x-button>Button1</button>
   *  <x-button>Button2</button>
   * </x-buttons>
   * ```
   *
   */
  readonly hiddenBorder = input<boolean, XBoolean>(this.config?.hiddenBorder ?? false, { transform: XToBoolean });
  /**
   * @zh_CN 显示阴影
   * @en_US show box shadow
   * @example
   *
   * ```html
   * <x-buttons boxShadow>
   *  <x-button>Button1</button>
   *  <x-button>Button2</button>
   * </x-buttons>
   * ```
   *
   */
  readonly boxShadow = input<boolean, XBoolean>(this.config?.boxShadow ?? true, { transform: XToBoolean });
  /**
   * @zh_CN 圆角按钮
   * @en_US Round button
   * @example
   *
   * ```html
   * <x-buttons round>
   *  <x-button>Button1</button>
   *  <x-button>Button2</button>
   * </x-buttons>
   * ```
   *
   */
  readonly round = input<boolean, XBoolean>(this.config?.round ?? false, { transform: XToBoolean });
}
