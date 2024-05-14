import { inject } from '@angular/core';
import { XComponentConfigKey, XConfigService } from '../config';

/**
 * @zh_CN 组件公共属性
 * @en_US Component of public properties
 */
export class XProperty {}

/**
 * @zh_CN 组件公共属性，通过函数返回，注入全局配置
 * @en_US Component of public properties, through the function returns, into the global configuration
 */
export function XPropertyFunction<T extends XComponentConfigKey>(configName: T) {
  return class XPropertyFun {
    config = inject(XConfigService).getConfigForComponent(configName);
  };
}
