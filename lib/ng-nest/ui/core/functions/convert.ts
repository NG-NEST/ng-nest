import { coerceBooleanProperty, _isNumberValue } from '@angular/cdk/coercion';
import {
  XData,
  XIsNull,
  XIsUndefined,
  XIsArray,
  XIsValue,
  XIsObject,
  XIsObservable,
  XParentIdentityProperty,
  XIsBoolean,
  XIsString,
  XBoolean
} from '../interfaces';
import { Observable, Subject, Observer } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

export function XToBoolean(value: XBoolean): boolean {
  // if (XIsString(value)) {
  //   return ['', 'true'].indexOf(String(value).trim()) !== -1;
  // } else {
  //   return Boolean(value);
  // }
  return coerceBooleanProperty(value);
}

function XToNumber(value: number | string): number;
function XToNumber<D>(value: number | string, fallback: D): number | D;
function XToNumber(value: number | string, fallbackValue: number = 0): number {
  return _isNumberValue(value) ? Number(value) : fallbackValue;
}

export function XToDataConvert<T>(value: XData<T>): XData<T> {
  if (XIsArray(value)) {
    return (value as []).map((x: any) => {
      if (XIsValue(x)) {
        return { label: x, id: x };
      } else if (XIsObject(x)) {
        x.label = XIsUndefined(x.label) || XIsNull(x.label) ? x.id : x.label;
        x.id = XIsUndefined(x.id) || XIsNull(x.id) ? x.label : x.id;
        return x;
      }
    });
  }
  return value;
}

export function XSetData<T>(data: XData<T>, unSubject: Subject<void>): Observable<T[]> {
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
            map((y) => XToDataConvert(y)),
            takeUntil(unSubject)
          )
          .subscribe((y) => {
            result(y as T[]);
          });
      } else {
        result(XToDataConvert(data) as T[]);
      }
    }
  });
}

export function XGetChildren<T extends XParentIdentityProperty<T>>(nodes: T[], node: T, level: number) {
  node.level = level;
  node.children = nodes.filter((y) => y.pid === node.id);
  node.leaf = node.children?.length > 0;
  if (node.leaf) node.children.map((y) => XGetChildren(nodes, y, level + 1));
  return node;
}

export function XInvertKeyValues(obj: any): Map<any, any> {
  return Object.keys(obj).reduce((nw, key) => {
    nw.set(obj[key], key);
    return nw;
  }, new Map());
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
        return originalDescriptor && originalDescriptor.get ? originalDescriptor.get.bind(this)() : this[privatePropName];
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
  return propDecoratorFactory('XInputBoolean', XToBoolean);
}

export function XInputNumber(): any {
  return propDecoratorFactory('XInputNumber', XToNumber);
}

export function XDataConvert(): any {
  return propDecoratorFactory('XDataConvert', XToDataConvert);
}
