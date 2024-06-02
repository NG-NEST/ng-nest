import { Injectable, inject } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { X_CONFIG } from './config';
import { XThemeService } from '../theme';
import type { XTheme } from '../theme';
import type { XConfig, XComponentConfigKey, XComponentConfig } from './config';

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

  setDarkTheme() {
    return this.themeService.setDark(true);
  }

  setLightTheme() {
    return this.themeService.setDark(false);
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
