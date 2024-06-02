export type AppCore = AppProp[];

/**
 * 属性文件对象
 */
export interface AppProp {
  /**
   * 名称
   */
  name?: string;
  /**
   * 标签
   */
  label?: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 对象类型
   */
  type?: AppPropType;
  /**
   * 属性
   */
  properties?: AppPrope[];
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
  decorator?: AppDecorator;
  /**
   * 继承对象 class
   */
  extends?: string[];
  /**
   * 实现的接口 interface
   */
  implements?: string;
  /**
   * 参数，仅当 type 等于 'function' 时
   */
  params?: { [key: string]: string };
  /**
   * 返回类型，仅当 type 等于 'function' 时
   */
  returnType?: string;
  /**
   * 实际类型值，仅当 type 等于 'type' 时
   */
  actualValue?: string[];
  /**
   * 子属性，继承的属性
   */
  children?: AppProp[];
  /**
   * 示例
   */
  example?: string;
  /**
   * 其它属性
   */
  [property: string]: any;
}

export interface AppPrope {
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
   * 转化为的类型
   */
  toType?: string;
  /**
   * 输入的类型
   */
  inputType?: string;
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
  /**
   * 示例
   */
  example?: string;
  /**
   * 转换函数
   */
  transform?: string;
  /**
   * signal 类型
   */
  signal?: 'input' | 'output' | 'model';
}

/**
 * 导出的对象类型
 */
export type AppPropType = 'interface' | 'class' | 'function' | 'const' | 'type' | 'enum' | 'group';

export type AppDecorator = 'component' | 'directive' | 'pipe';
