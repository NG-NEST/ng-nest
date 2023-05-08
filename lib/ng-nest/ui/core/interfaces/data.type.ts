import { Observable, isObservable } from 'rxjs';
import { TemplateRef, SimpleChange } from '@angular/core';

// 数据类型
export type XData<T> = T[] | Observable<T[] | any[]> | any[] | Function;

// Boolean 类型
export type XBoolean = boolean | string;

// Number 类型
export type XNumber = number | string;

// 模板类型
export type XTemplate = string | number | Date | TemplateRef<any>;

// 类型判断
export const XIsType = (type: string) => (object: any) => Object.prototype.toString.call(object) === `[object ${type}]`;

// 值改变判断
export const XIsChange = (...changes: SimpleChange[]) => {
  for (let change of changes) {
    if (change?.currentValue !== change?.previousValue) return true;
  }
  return false;
};

const IsString = XIsType('String');
const IsArray = XIsType('Array');
const IsNumber = XIsType('Number');
const IsBoolean = XIsType('Boolean');
const IsObject = XIsType('Object');
const IsNull = XIsType('Null');
const IsFunction = XIsType('Function');
const IsDate = XIsType('Date');
const IsRegExp = XIsType('RegExp');

export function XIsString(value: any): value is string {
  return IsString(value);
}
export function XIsArray(value: any): value is Array<any> {
  return IsArray(value);
}
export function XIsNumber(value: any): value is number {
  return IsNumber(value);
}
export function XIsBoolean(value: any): value is boolean {
  return IsBoolean(value);
}
export function XIsObject(value: any): value is object {
  return IsObject(value);
}
export function XIsNull(value: any): value is null {
  return IsNull(value);
}
export function XIsFunction(value: any): value is Function {
  return IsFunction(value);
}
export function XIsDate(value: any): value is Date {
  return IsDate(value);
}
export function XIsRegExp(value: any): value is RegExp {
  return IsRegExp(value);
}
export function XIsUndefined(value: any): value is undefined {
  return typeof value === 'undefined';
}
export function XIsValue<T>(object: any): object is T {
  return XIsString(object) || XIsNumber(object) || XIsBoolean(object) || XIsDate(object);
}
export function XIsEmpty(object: any) {
  return XIsUndefined(object) || XIsNull(object) || object === '' || object.length === 0;
}
export function XIsValueArray<T>(object: any): object is T {
  return XIsArray(object) && object.length > 0 && !XIsObject(object[0]);
}
export function XIsObjectArray<T>(object: any): object is T {
  return XIsArray(object) && object.length > 0 && XIsObject(object[0]);
}
export function XIsObservable<T>(object: any): object is Observable<T> {
  return isObservable(object);
}
export function XIsTemplateRef<T>(object: any): object is TemplateRef<T> {
  if (!XIsEmpty(object) && object.elementRef) return true;
  else return false;
}
export function XIsXTemplate(object: any): object is XTemplate {
  return XIsString(object) || XIsNumber(object) || XIsDate(object) || XIsTemplateRef(object);
}
