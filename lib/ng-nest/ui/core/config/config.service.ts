// tslint:disable no-any

import { Injectable, Optional, Inject } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { XConfig, X_CONFIG, XConfigKey, XComponentConfigKey, XComponentConfig } from './config';
import { XThemeService, XTheme, X_THEME_COLORS, X_THEME_DARK_COLORS, XColorsTheme } from '../theme';
import { filter, mapTo } from 'rxjs/operators';

const isDefined = function (value?: any): boolean {
  return value !== undefined;
};

@Injectable({
  providedIn: 'root'
})
export class XConfigService {
  private componentConfigUpdated$ = new Subject<keyof XComponentConfig>();
  private config: XConfig;
  public themeService: XThemeService;

  constructor(@Optional() themeService?: XThemeService, @Optional() @Inject(X_CONFIG) defaultConfig?: XConfig) {
    this.config = defaultConfig || {};
    if (themeService) {
      this.themeService = themeService;
    }
    this.setInitialTheme(this.config.theme);
  }

  getConfigForComponent<T extends XComponentConfigKey>(componentName: T): XComponentConfig[T] {
    return this.config?.components ? this.config.components[componentName] : undefined;
  }

  getConfigChangeEventForComponent(componentName: XComponentConfigKey): Observable<void> {
    return this.componentConfigUpdated$.pipe(
      filter((n) => n === componentName),
      mapTo(undefined)
    );
  }

  set<T extends XComponentConfigKey>(componentName: T, value: XComponentConfig[T]): void {
    if (this.config?.components) {
      this.config.components[componentName] = { ...this.config.components[componentName], ...value };
      this.componentConfigUpdated$.next(componentName);
    }
  }

  setDarkTheme(theme?: XTheme) {
    let colors = theme?.colors;
    if (!colors) colors = X_THEME_DARK_COLORS;
    this.setTheme({
      colors: this.themeService.getDefineColors(Object.assign({}, this.themeService.getColorsInProperty(X_THEME_COLORS), colors), '', true)
    });
  }

  setLightTheme(theme?: XTheme) {
    let colors = theme?.colors;
    if (!colors) colors = X_THEME_COLORS;
    this.setTheme({
      colors: this.themeService.getDefineColors(Object.assign({}, this.themeService.getColorsInProperty(X_THEME_COLORS), colors), '', false)
    });
  }

  setTheme(theme?: XTheme) {
    this.themeService.setTheme(theme);
  }

  setInitialTheme(theme?: XTheme) {
    this.themeService.setInitialTheme(theme);
  }

  getTheme(includesAll = false): XTheme {
    return this.themeService.getTheme(includesAll);
  }
}

// tslint:disable:no-invalid-this
// tslint:disable:no-any

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

// tslint:disable-next-line:typedef
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
