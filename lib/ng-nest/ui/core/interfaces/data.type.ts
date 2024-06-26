import { Observable, isObservable } from 'rxjs';
import { TemplateRef, SimpleChange } from '@angular/core';
import type { InputSignal } from '@angular/core';

/**
 * @zh_CN data 数据类型
 * 通用的泛型数据类型，一般是指数组、可订阅对象并且流数据为数组类型、函数等
 * @en_US Data data type
 * General generic data types, generally is index set,
 * can subscribe to the object and flow data for the array, function, etc
 */
export type XData<T> = T[] | Observable<T[] | any[]> | any[] | Function;

/**
 * @zh_CN data 数据类型
 * 通用的泛型数据类型，一般是指数组
 * @en_US Data data type
 * General generic data types, generally is index set
 */
export type XDataArray<T> = string | number | (T | string | number)[];

/**
 * @zh_CN boolean 数据类型
 * 此类型作为组件的输入参数，一般会使用 `XToBoolean` 转换函数，转换成 true 或 false
 * @en_US Boolean data type
 * This type as a component of the input parameters,
 * usually with `XToBoolean` decorator to process parameters,
 * directly into true or false
 * @example
 *
 * ```html
 * // true
 * <my-component disabled></my-component>
 * <my-component disabled="true"></my-component>
 * <my-component [disabled]="true"></my-component>
 *
 * // false
 * <my-component disabled="false"></my-component>
 * <my-component [disabled]="false"></my-component>
 * ```
 *
 */
export type XBoolean = boolean | string;

/**
 * @zh_CN number 数据类型
 * 此类型作为组件的输入参数，一般会使用 `XToNumber` 转换函数，转换成数字类型
 * 如果是宽高尺寸，会通过 `XToCssPixelValue` 转换函数，转换成字符串尺寸
 * @en_US Number data type
 * This type as the input parameters of the component, generally use `XToNumber` conversion function, converted to digital type
 * If the width of the high is through `XToCssPixelValue` conversion function, convert the string size
 * @example
 *
 * ```html
 * // XToNumber => num = 10
 * <my-component max="10"></my-component>
 * <my-component [max]="10"></my-component>
 * <my-component [max]="'10'"></my-component>
 *
 * // XToCssPixelValue
 * // width = '200px'
 * <my-component width="200"></my-component>
 * <my-component width="200px"></my-component>
 * <my-component [width]="200"></my-component>
 * <my-component [width]="'200'"></my-component>
 * <my-component [width]="'200px'"></my-component>
 * // width = '20rem'
 * <my-component width="20rem"></my-component>
 * <my-component [width]="'20rem'"></my-component>
 * // width = '50%'
 * <my-component width="50%"></my-component>
 * <my-component [width]="'50%'"></my-component>
 * ```
 *
 */
export type XNumber = number | string;

/**
 * @zh_CN 模板类型
 * 一般会配合 `outlet` 指令来指定一个参数即可为基本数据类型，也可为模板
 * @en_US Template type
 * Usually cooperate `outlet` instructions to specify a parameter can be as the basic data types, can also be used as a template
 * @example
 *
 * ```html
 * // label = "string"
 * <ng-container *xOutlet="label">{{ label }}</ng-container>
 *
 * <ng-container *xOutlet="labelTpl">{{ labelTpl }}</ng-container>
 * <ng-template #labelTpl>this is a label template</ng-template>
 * ```
 *
 */
export type XTemplate = string | number | Date | TemplateRef<any>;

/**
 * @zh_CN 函数返回类型
 * @en_US Function return type
 */
export type XTypeFunc = (object: any) => boolean;

/**
 * @zh_CN 类型判断
 * @en_US Type judgment
 */
export function XIsType(type: string): XTypeFunc {
  return (object: any) => Object.prototype.toString.call(object) === `[object ${type}]`;
}

/**
 * @zh_CN 值改变判断
 * @en_US Value change judgment
 */
export function XIsChange(...changes: SimpleChange[]): boolean {
  for (let change of changes) {
    if (change?.currentValue !== change?.previousValue) return true;
  }
  return false;
}

const IsString = XIsType('String');
const IsArray = XIsType('Array');
const IsNumber = XIsType('Number');
const IsBoolean = XIsType('Boolean');
const IsObject = XIsType('Object');
const IsNull = (value: null) => value === null;
const IsFunction = XIsType('Function');
const IsDate = XIsType('Date');
const IsRegExp = XIsType('RegExp');

/**
 * @zh_CN 判断给定的值是否为字符串类型
 * @en_US Determine whether the given value is a string type
 */
export function XIsString(value: any): value is string {
  return IsString(value);
}

/**
 * @zh_CN 判断给定的值是否为数组类型
 * @en_US Determine whether the given value is a array type
 */
export function XIsArray<T>(value: any): value is Array<T> {
  return IsArray(value);
}

/**
 * @zh_CN 判断给定的值是否为数字类型
 * @en_US Determine whether the given value is a number type
 */
export function XIsNumber(value: any): value is number {
  return IsNumber(value);
}

/**
 * @zh_CN 判断给定的值是否为布尔类型
 * @en_US Determine whether the given value is a boolean type
 */
export function XIsBoolean(value: any): value is boolean {
  return IsBoolean(value);
}

/**
 * @zh_CN 判断给定的值是否为对象类型
 * @en_US Determine whether the given value is a object type
 */
export function XIsObject<T>(value: any): value is T {
  return IsObject(value);
}

/**
 * @zh_CN 判断给定的值是否为 null 类型
 * @en_US Determine whether the given value is a null type
 */
export function XIsNull(value: any): value is null {
  return IsNull(value);
}

/**
 * @zh_CN 判断给定的值是否为函数类型
 * @en_US Determine whether the given value is a function type
 */
export function XIsFunction(value: any): value is Function {
  return IsFunction(value);
}

/**
 * @zh_CN 判断给定的值是否为日期类型
 * @en_US Determine whether the given value is a date type
 */
export function XIsDate(value: any): value is Date {
  return IsDate(value);
}

/**
 * @zh_CN 判断给定的值是否为正则表达式
 * @en_US Determine whether the given value is a regular expression
 */
export function XIsRegExp(value: any): value is RegExp {
  return IsRegExp(value);
}

/**
 * @zh_CN 判断给定的值是否为 undefined
 * @en_US Determine whether the given value is undefined
 */
export function XIsUndefined(value: any): value is undefined {
  return typeof value === 'undefined';
}

/**
 * @zh_CN 判断给定的值是否为字符串、数字、布尔值或日期
 * @en_US Determine whether the given value is a string, number, Boolean value or date
 */
export function XIsValue<T>(object: any): object is T {
  return XIsString(object) || XIsNumber(object) || XIsBoolean(object) || XIsDate(object);
}

/**
 * @zh_CN 判断一个对象是否为空
 * @en_US Determine whether an object is empty
 */
export function XIsEmpty(object: any) {
  try {
    return XIsUndefined(object) || XIsNull(object) || object === '' || object.length === 0;
  } catch (e) {
    console.error(object, e);
  }
  return true;
}

/**
 * @zh_CN 判断给定的对象是否为非空数组
 * @en_US Determine whether the given object is a non -empty array
 */
export function XIsValueArray<T>(object: any): object is T {
  return XIsArray(object) && object.length > 0 && !XIsObject(object[0]);
}

/**
 * @zh_CN 判断给定的对象是否为非空对象数组
 * @en_US Determine whether the given object is a non -empty object array
 */
export function XIsObjectArray<T>(object: any): object is T {
  return XIsArray(object) && object.length > 0 && XIsObject(object[0]);
}

/**
 * @zh_CN 判断给定的对象是否为 Observable
 * @en_US Determine whether the given object is observable
 */
export function XIsObservable<T>(object: any): object is Observable<T> {
  return isObservable(object);
}

/**
 * @zh_CN 判断给定的对象是否为 TemplateRef
 * @en_US Determine whether the given object is TemplateRef
 */
export function XIsTemplateRef<T>(object: any): object is TemplateRef<T> {
  if (!XIsEmpty(object) && object.elementRef) return true;
  else return false;
}

/**
 * @zh_CN 判断给定的对象是否为 XTemplateRef
 * @en_US Determine whether the given object is XTemplateRef
 */
export function XIsXTemplate(object: any): object is XTemplate {
  return XIsString(object) || XIsNumber(object) || XIsDate(object) || XIsTemplateRef(object);
}

/**
 * @zh_CN 判断给定的对象是否为 InputSignal
 * @en_US Determine whether a given object for InputSignal
 */
export function XIsInputSignal(object: any): object is InputSignal<any> {
  return XIsFunction(object) && object.name === 'inputValueFn';
}
