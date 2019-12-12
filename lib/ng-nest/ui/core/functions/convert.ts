import { coerceBooleanProperty, _isNumberValue } from "@angular/cdk/coercion";
import {
  XIdentityInput,
  XData,
  XIsNull,
  XIsUndefined,
  XIsObservable,
  XIsArray,
  XIsValue,
  XIsObject
} from "../interfaces";

function toBoolean(value: boolean): boolean {
  return coerceBooleanProperty(value);
}

function toNumber(value: number | string): number;
function toNumber<D>(value: number | string, fallback: D): number | D;
function toNumber(value: number | string, fallbackValue: number = 0): number {
  return _isNumberValue(value) ? Number(value) : fallbackValue;
}

export function XToDataConvert(value: XData<XIdentityInput>): any {
  if (XIsArray(value)) {
    return (value as []).map((x: any) => {
      if (XIsValue(x)) {
        return { label: x, value: x };
      } else if (XIsObject(x)) {
        x.label = XIsUndefined(x.label) || XIsNull(x.label) ? x.value : x.label;
        x.value = XIsUndefined(x.value) || XIsNull(x.value) ? x.label : x.value;
        return x;
      }
    });
  }
  if (XIsObservable(value)) return value;
}

function propDecoratorFactory<T, D>(name: string, fallback: (v: T) => D): (target: any, propName: string) => void {
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

export function XInputBoolean(): any {
  return propDecoratorFactory("InputBoolean", toBoolean);
}

export function XInputNumber(): any {
  return propDecoratorFactory("InputNumber", toNumber);
}

export function XDataConvert(): any {
  return propDecoratorFactory("XDataConvert", XToDataConvert);
}
