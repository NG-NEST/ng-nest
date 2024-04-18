import { coerceCssPixelValue } from '@angular/cdk/coercion';
import {
  XIsNull,
  XIsUndefined,
  XIsArray,
  XIsValue,
  XIsObject,
  XIsObservable,
  XIsFunction,
  XIsNumber
} from '../interfaces';
import { Observable, Subject, Observer } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { WritableSignal, booleanAttribute, numberAttribute } from '@angular/core';
import type { XData, XParentIdentityProperty, XBoolean, XClassMap, XNumber } from '../interfaces';

/**
 * @zh_CN 转换 value 为 boolean 值
 * @en_US Convert the value to boolean value
 */
export function XToBoolean(value: XBoolean): boolean {
  return booleanAttribute(value);
}

/**
 * @zh_CN 转换 value 为 boolean 值
 * @en_US Convert the value to boolean value
 */
export function XToCssPixelValue(value: XNumber): string {
  if (!XIsNumber(value) && /^\d+(\.\d+)?$/.test(value)) {
    return coerceCssPixelValue(Number(value));
  } else {
    return coerceCssPixelValue(value);
  }
}

/**
 * @zh_CN 转换 value 为 number 值
 * @en_US Convert the value to Number value
 */
export function XToNumber(value: XNumber): number;
export function XToNumber<D>(value: XNumber, fallback: D): number | D;
export function XToNumber(value: XNumber, fallbackValue?: number): number {
  return numberAttribute(value, fallbackValue);
}

/**
 * @zh_CN 转换 value 为指定的 list 数据 [{ label: any; id: any }, ....]
 * @en_US Convert value as the specified list data [{ label: any; id: any }, ....]
 */
export function XToDataConvert<T>(value: XData<T>): XData<T> {
  if (XIsArray(value)) {
    return (value as []).map((x: any) => {
      if (XIsValue(x)) {
        return { label: x, id: x };
      } else if (XIsObject<{ label: any; id: any }>(x)) {
        x.label = XIsUndefined(x.label) || XIsNull(x.label) ? x.id : x.label;
        x.id = XIsUndefined(x.id) || XIsNull(x.id) ? x.label : x.id;
        return x;
      }
      return x;
    });
  }
  return value;
}

/**
 * @zh_CN 根据 data 的类型获取实际的数据
 * @en_US Obtain actual data based on the type of data
 */
export function XSetData<T>(
  data: XData<T>,
  unSubject: Subject<void>,
  toConvert = true,
  funcParam: any = null
): Observable<T[]> {
  return new Observable((x: Observer<T[]>) => {
    const result = (res: T[]) => {
      x.next(res);
      x.complete();
    };
    if (typeof data === 'undefined') {
      result([]);
    } else {
      if (XIsObservable(data)) {
        (data as Observable<T[]>)
          .pipe(
            map((y) => (toConvert ? XToDataConvert(y) : y)),
            takeUntil(unSubject)
          )
          .subscribe((y) => {
            result(y as T[]);
          });
      } else if (XIsFunction(data)) {
        (data as (param: any) => Observable<T[]>)(funcParam)
          .pipe(
            map((y) => (toConvert ? XToDataConvert(y) : y)),
            takeUntil(unSubject)
          )
          .subscribe((y) => {
            result(y as T[]);
          });
      } else {
        result((toConvert ? XToDataConvert(data) : data) as T[]);
      }
    }
  });
}

/**
 * @zh_CN 根据 id、pid 获取子节点
 * @en_US Obtain sub-nodes based on ID and PID
 */
export function XGetChildren<T extends XParentIdentityProperty<T>>(nodes: T[], node: T, level: number): T {
  node.level = level;
  node.children = nodes.filter((y) => y.pid === node.id);
  node.leaf = node.children?.length > 0;
  if (node.leaf) node.children.map((y) => XGetChildren(nodes, y, level + 1));
  return node;
}

/**
 * @zh_CN 将对象键值对反转
 * @en_US Reversal the key value of the object
 */
export function XInvertKeyValues(obj: any): Map<any, any> {
  return Object.keys(obj).reduce((nw, key) => {
    nw.set(obj[key], key);
    return nw;
  }, new Map());
}

/**
 * @zh_CN 设置样式名称为 false
 * @en_US Set style name is false
 */
export function XClearClass(...classMaps: XClassMap[]): void {
  classMaps.forEach((classMap) => {
    for (const key in classMap) {
      classMap[key] = false;
    }
  });
}

/**
 * @zh_CN 设置样式名称为 false
 * @en_US Set style name is false
 */
export function XClearClassSignal(...classMaps: WritableSignal<XClassMap>[]): void {
  classMaps.forEach((classMap) => {
    const value = classMap();
    for (const key in value) {
      value[key] = false;
    }
    classMap.set(value);
  });
}

/**
 * @zh_CN 属性装饰器返回类型
 * @en_US Attribute decorator return type
 */
export type XPropDecorator = (target: any, propName: string) => void;

/**
 * @zh_CN 创建属性装饰器的工厂函数
 * @en_US Factory functions that create attribute decorators
 */
function propDecoratorFactory<T, D>(name: string, fallback: (v: T) => D): XPropDecorator {
  function propDecorator(target: any, propName: string, originalDescriptor?: TypedPropertyDescriptor<any>): any {
    const privatePropName = `$$__${propName}`;

    if (Object.prototype.hasOwnProperty.call(target, privatePropName)) {
      console.warn(`The prop "${privatePropName}" is already exist, it will be overrided by ${name} decorator.`);
    }

    Object.defineProperty(target, privatePropName, {
      configurable: true,
      writable: true
    });

    return {
      get(): string {
        return originalDescriptor && originalDescriptor.get
          ? originalDescriptor.get.bind(this)()
          : this[privatePropName];
      },
      set(value: T): void {
        if (originalDescriptor && originalDescriptor.set) {
          originalDescriptor.set.bind(this)(fallback(value));
        }
        this[privatePropName] = fallback(value);
      }
    };
  }

  return propDecorator;
}

/**
 * @zh_CN 创建 XInputBoolean 属性装饰器
 * @en_US Create XInputBoolean Properties
 */
export function XInputBoolean(): XPropDecorator {
  return propDecoratorFactory('XInputBoolean', XToBoolean);
}

/**
 * @zh_CN 创建 XInputNumber 属性装饰器
 * @en_US Create XInputNumber Properties
 */
export function XInputNumber(): XPropDecorator {
  return propDecoratorFactory('XInputNumber', XToNumber);
}

/**
 * @zh_CN 创建 XInputNumber 属性装饰器
 * @en_US Create XInputNumber Properties
 */
export function XInputCssPixelValue(): XPropDecorator {
  return propDecoratorFactory('XInputCssPixelValue', XToCssPixelValue);
}

/**
 * @zh_CN 创建 XDataConvert 属性装饰器
 * @en_US Create XDataConvert Properties
 */
export function XDataConvert(): XPropDecorator {
  return propDecoratorFactory('XDataConvert', XToDataConvert);
}

/**
 * @zh_CN 限制给定数值 value 的范围
 * @en_US Limit the range of the given value value
 */
export function XClamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
