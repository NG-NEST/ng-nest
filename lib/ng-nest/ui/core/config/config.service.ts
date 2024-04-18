// tslint:disable no-any

import { Injectable, inject } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { X_CONFIG } from './config';
import { XThemeService, X_THEME_COLORS, X_THEME_DARK_COLORS } from '../theme';
import type { XTheme } from '../theme';
import type { XConfig, XComponentConfigKey, XComponentConfig } from './config';

const isDefined = function (value?: any): boolean {
  return value !== undefined;
};

@Injectable({
  providedIn: 'root'
})
export class XConfigService {
  private componentConfigUpdated$ = new Subject<keyof XComponentConfig>();
  private config: XConfig;
  private defaultConfig = inject(X_CONFIG, { optional: true })!;
  public themeService = inject(XThemeService, { optional: true })!;

  constructor() {
    this.config = this.defaultConfig || {};
    this.setInitialTheme(this.config.theme);
  }

  getConfigForComponent<T extends XComponentConfigKey>(componentName: T): XComponentConfig[T] {
    return this.config?.components ? this.config.components[componentName] : undefined;
  }

  getConfigChangeEventForComponent(componentName: XComponentConfigKey): Observable<void> {
    return this.componentConfigUpdated$.pipe(
      filter((n) => n === componentName),
      map(() => undefined)
    );
  }

  set<T extends XComponentConfigKey>(componentName: T, value: XComponentConfig[T]): void {
    if (this.config?.components) {
      this.config.components[componentName] = {
        ...this.config.components[componentName],
        ...value
      };
      this.componentConfigUpdated$.next(componentName);
    }
  }

  setDarkTheme(theme?: XTheme) {
    let colors = theme?.colors;
    if (!colors) colors = X_THEME_DARK_COLORS;
    this.setTheme({
      colors: this.themeService.getDefineColors(
        Object.assign({}, this.themeService.getColorsInProperty(X_THEME_COLORS), colors),
        '',
        true
      )
    });
  }

  setLightTheme(theme?: XTheme) {
    let colors = theme?.colors;
    if (!colors) colors = X_THEME_COLORS;
    this.setTheme({
      colors: this.themeService.getDefineColors(
        Object.assign({}, this.themeService.getColorsInProperty(X_THEME_COLORS), colors),
        '',
        false
      )
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

// tslint:disable-next-line:typedef
export function XWithConfig<T>(componentName: XComponentConfigKey, innerDefaultValue?: T) {
  return function ConfigDecorator(target: any, propName: any, originalDescriptor?: TypedPropertyDescriptor<T>): any {
    const privatePropName = `$$__assignedValue__${propName}`;

    Object.defineProperty(target, privatePropName, {
      configurable: true,
      writable: true,
      enumerable: false
    });

    return {
      get(): T | undefined {
        const originalValue =
          originalDescriptor && originalDescriptor.get ? originalDescriptor.get.bind(this)() : this[privatePropName];

        if (isDefined(originalValue)) {
          return originalValue;
        }

        const componentConfig = this.configService?.getConfigForComponent(componentName) || {};
        const configValue = componentConfig[propName];

        return isDefined(configValue) ? configValue : innerDefaultValue;
      },
      set(value: T): void {
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
