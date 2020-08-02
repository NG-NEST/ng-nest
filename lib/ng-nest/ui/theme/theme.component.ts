import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, Optional, OnDestroy } from '@angular/core';
import { XThemeProperty } from './theme.property';
import {
  XConfigService,
  XThemeService,
  XValueAccessor,
  XColorsTheme,
  XTheme,
  X_THEME_COLOR_KEYS,
  X_THEME_COLORS,
  X_THEME_DARK_COLORS
} from '@ng-nest/ui/core';
import { FormGroup } from '@angular/forms';
import { XControl } from '@ng-nest/ui/form';
import { debounceTime, takeUntil, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { XI18nService, XI18nTheme } from '@ng-nest/ui/i18n';

@Component({
  selector: 'x-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XThemeComponent)]
})
export class XThemeComponent extends XThemeProperty implements OnInit, OnDestroy {
  formGroup = new FormGroup({});

  theme: XTheme = {
    colors: {}
  };
  width = '45rem';
  beforeColors: XColorsTheme = {};
  currentColors: XColorsTheme = {};
  darkBeforeColors: XColorsTheme = {};
  controls: XControl[] = [
    { control: 'color-picker', id: 'primary', label: '主色', span: 5 },
    { control: 'color-picker', id: 'success', label: '成功', span: 5 },
    { control: 'color-picker', id: 'warning', label: '警告', span: 5 },
    { control: 'color-picker', id: 'danger', label: '危险', span: 5 },
    { control: 'color-picker', id: 'info', label: '信息', span: 5 },
    { control: 'color-picker', id: 'background', label: '背景', span: 5 },
    { control: 'color-picker', id: 'border', label: '边框', span: 5 },
    { control: 'color-picker', id: 'text', label: '文字', span: 5 }
  ];

  value: XColorsTheme = {};

  themeService: XThemeService;

  locale: XI18nTheme = {};

  private _unSubject = new Subject<void>();

  writeValue(value: XColorsTheme) {
    this.value = value;
    if (this.value && Object.keys(this.value).length > 0) {
      this.theme = { colors: this.themeService.getDefineColors(Object.assign({}, X_THEME_COLORS, this.value), '', this.dark as boolean) };
      this.formGroup.patchValue(this.theme.colors as XColorsTheme);
    }
    this.cdr.detectChanges();
  }

  constructor(public configService: XConfigService, public i18n: XI18nService, public cdr: ChangeDetectorRef) {
    super();
    this.themeService = this.configService.themeService;
  }

  ngOnInit() {
    this.theme = this.configService.getTheme(true);
    this.setControls();
    this.setDefaultColors();
    this.controls.map((x: XControl) => {
      x.value = (this.theme.colors as XColorsTheme)[x.id];
    });
    this.i18n.localeChange
      .pipe(
        map((x) => x.theme as XI18nTheme),
        takeUntil(this._unSubject)
      )
      .subscribe((x) => {
        this.locale = x;
        this.setControlsLabel();
        this.cdr.detectChanges();
      });
  }

  ngAfterViewInit() {
    this.formGroup.valueChanges.pipe(debounceTime(100), takeUntil(this._unSubject)).subscribe((x: XColorsTheme) => {
      this.beforeColors = this.currentColors;
      let changes = this.getChanges(x);
      if (this.isOneAndInColorKeys(changes)) {
        let [key, value] = Object.entries(changes)[0];
        let colors = !this.dark ? this.themeService.setRoot(key, value, '') : this.themeService.setDarkRoot(key, value, '');
        Object.assign(x, colors);
        this.currentColors = x;
        this.formGroup.patchValue(x);
      } else {
        this.currentColors = x;
        this.value = x;
        this.configService.setTheme({ colors: x });
      }
    });
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  setControlsLabel() {
    Object.keys(this.locale).forEach((x) => {
      let control = this.controls.find((y) => y.id === x);
      if (control) {
        control.label = (this.locale as any)[x];
        control.change && control.change();
      }
    });
  }

  setDefaultColors() {
    this.beforeColors = this.theme.colors as XColorsTheme;
    this.currentColors = this.beforeColors;
    this.darkBeforeColors = this.beforeColors;
  }

  setControls() {
    [...this.controls].forEach((control, index) => {
      let addControls: XControl[] = [];
      control.span = !this.showDetail ? 6 : 5;
      this.width = !this.showDetail ? '36rem' : '45rem';
      for (let amount of this.amounts) {
        addControls.push({
          control: 'color-picker',
          id: `${control.id}${this.themeService.getSuffix(amount as number)}`,
          label: '',
          hidden: !this.showDetail
        });
      }
      this.controls.splice(index * this.amounts.length + index + 1, 0, ...addControls);
    });
  }

  default() {
    this.dark = false;
    let colors = this.themeService.getDefineColors(Object.assign({}, X_THEME_COLORS), '', this.dark);
    this.beforeColors = colors;
    this.currentColors = colors;
    this.formGroup.patchValue(colors);
    this.defaultClick.emit(colors);
    this.cdr.detectChanges();
  }

  isOneAndInColorKeys(colors: XColorsTheme) {
    const keys = Object.keys(colors);
    if (keys.length === 1 && X_THEME_COLOR_KEYS.includes(keys[0])) {
      return true;
    }
    return false;
  }

  getChanges(colors: XColorsTheme) {
    let result: XColorsTheme = {};
    for (let color in colors) {
      if (colors[color] !== this.beforeColors[color]) {
        result[color] = colors[color];
      }
    }
    return result;
  }

  darkChanges($event: Event) {
    let colors = this.darkBeforeColors as XColorsTheme;
    if (this.dark) {
      this.beforeColors = this.formGroup.value;
      this.darkBeforeColors = this.formGroup.value;
      colors = this.themeService.getDefineColors(
        Object.assign({}, this.themeService.getColorsInProperty(X_THEME_COLORS), X_THEME_DARK_COLORS),
        '',
        this.dark as boolean
      );
    }
    this.formGroup.patchValue(colors);
    this.darkChange.emit(this.dark);
  }
}
