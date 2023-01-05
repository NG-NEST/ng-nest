/**
 * 组件中的属性文件对象
 *
 * @export
 * @interface NcProp
 */
export interface NcProp {
  /**
   * 名称
   */
  name?: string;
  /**
   *
   */
  label?: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 对象类型
   */
  type?: NcPropType;
  /**
   * 属性
   */
  properties?: NcPrope[];
  /**
   * 值，仅当 type 等于 'const' 或 'type' 时
   */
  value?: string | number;
  /**
   * 组件/指令名/管道名
   */
  selector?: string;
  /**
   * 装饰器
   */
  decorator?: NcDecorator;
  /**
   * 继承对象 class
   */
  extends?: string;
  /**
   * 实现的接口 interface
   */
  implements?: string;
}

export interface NcPrope {
  /**
   * 属性名
   */
  name?: string;
  /**
   * 名称
   */
  label?: string;
  /**
   * 标签中使用的属性名
   */
  attr?: string;
  /**
   * 默认值
   */
  default?: string;
  /**
   * 属性类型
   */
  type?: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 装饰器
   */
  decorator?: string[];
  /**
   * 输入或输出
   */
  propType?: string;
  /**
   * 属性支持全局配置
   * 针对 interface 中属性配置的说明 @withConfig true
   */
  withConfig?: boolean;
}

/**
 * 导出的对象类型
 */
export enum NcPropType {
  Interface = 'interface',
  Class = 'class',
  Const = 'const',
  Type = 'type',
  Enum = 'enum'
}

export enum NcDecorator {
  Component = 'component',
  Directive = 'directive',
  Pipe = 'pipe'
}
