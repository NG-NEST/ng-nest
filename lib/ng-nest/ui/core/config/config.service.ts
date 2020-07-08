import { Injectable, Optional, Inject } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { XConfig, X_CONFIG, XConfigKey } from './config';
import { filter, mapTo } from 'rxjs/operators';
import { XThemeService } from '../theme';

const isDefined = function (value?: any): boolean {
  return value !== undefined;
};

@Injectable({
  providedIn: 'root'
})
export class XConfigService {
  private configUpdated$ = new Subject<keyof XConfig>();
  private config: XConfig;

  constructor(@Optional() @Inject(X_CONFIG) defaultConfig?: XConfig) {
    this.config = defaultConfig || {};
  }

  getConfigForComponent<T extends XConfigKey>(componentName: T): XConfig[T] {
    return this.config[componentName];
  }

  getConfigChangeEventForComponent(componentName: XConfigKey): Observable<void> {
    return this.configUpdated$.pipe(
      filter((n) => n === componentName),
      mapTo(undefined)
    );
  }

  set<T extends XConfigKey>(componentName: T, value: XConfig[T]): void {
    this.config[componentName] = { ...this.config[componentName], ...value };
    this.configUpdated$.next(componentName);
  }
}

const lowercaseFirstLetter = (s: string): string => {
  return s.charAt(0).toLowerCase() + s.slice(1);
};

export const trimComponentName = (componentName: string): XConfigKey => {
  return lowercaseFirstLetter(
    componentName
      .replace('X', '')
      .replace(/(Component|Directive|Service|Property)$/g, '')
      .toLowerCase()
  ) as XConfigKey;
};

export function XWithConfig<T>(innerDefaultValue?: T) {
  return function ConfigDecorator(target: any, propName: any, originalDescriptor?: TypedPropertyDescriptor<T>): any {
    const privatePropName = `$$__assignedValue__${propName}`;
    const componentName = trimComponentName(target.constructor.name) as XConfigKey;

    if (Object.prototype.hasOwnProperty.call(target, privatePropName)) {
      console.warn(`The prop "${privatePropName}" is already exist, it will be override by ${componentName} decorator.`);
    }

    Object.defineProperty(target, privatePropName, {
      configurable: true,
      writable: true,
      enumerable: false
    });

    return {
      get(): T | undefined {
        const originalValue = originalDescriptor && originalDescriptor.get ? originalDescriptor.get.bind(this)() : this[privatePropName];

        if (isDefined(originalValue)) {
          return originalValue;
        }

        const componentConfig = this.configService?.getConfigForComponent(componentName) || {};
        const configValue = componentConfig[propName];

        return isDefined(configValue) ? configValue : innerDefaultValue;
      },
      set(value?: T): void {
        if (originalDescriptor && originalDescriptor.set) {
          originalDescriptor.set.bind(this)(value);
        } else {
          this[privatePropName] = value;
        }
      },
      configurable: true,
      enumerable: true
    };
  };
}
