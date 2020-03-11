import { Observable, BehaviorSubject, isObservable } from 'rxjs';
import { TemplateRef, SimpleChange, SimpleChanges } from '@angular/core';

// 数据类型
export type XData<T> = T | BehaviorSubject<T> | Observable<T> | any;

// 模板类型
export type XTemplate = string | number | Date | TemplateRef<any>;

// 类型判断
export const XIsType = (type: string) => (object: any) => Object.prototype.toString.call(object) === `[object ${type}]`;

// 值改变判断
export const XIsChange = (...changes: SimpleChange[]) => {
  for (let change of changes) {
    if (change && change.currentValue !== change.previousValue) return true;
  }
};

export const XIsString = XIsType('String');
export const XIsArray = XIsType('Array');
export const XIsNumber = XIsType('Number');
export const XIsBoolean = XIsType('Boolean');
export const XIsObject = XIsType('Object');
export const XIsNull = XIsType('Null');
export const XIsFunction = XIsType('Function');
export const XIsDate = XIsType('Date');
export const XIsRegExp = XIsType('RegExp');
export const XIsValue = (object: any) =>
  XIsString(object) || XIsNumber(object) || XIsBoolean(object) || XIsDate(object);
export const XIsUndefined = (object: any) => typeof object === 'undefined';
export const XIsEmpty = (object: any) =>
  typeof object === 'undefined' || object === null || object === '' || object.length === 0;
export const XIsValueArray = (object: any) => XIsArray(object) && object.length > 0 && !XIsObject(object[0]);
export const XIsObjectArray = (object: any) => XIsArray(object) && object.length > 0 && XIsObject(object[0]);
export const XIsObservable = (object: any) => isObservable(object);
export const XIsTemplateRef = (object: any) => !XIsEmpty(object) && object.elementRef;
export const XIsXTemplate = (object: any) =>
  XIsString(object) || XIsNumber(object) || XIsDate(object) || XIsTemplateRef(object);
