import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { XThemeProperty } from './theme.property';
import { XConfigService, XThemeService, XValueAccessor, XColorsTheme, XTheme, X_THEME_COLOR_KEYS } from '@ng-nest/ui/core';
import { FormGroup } from '@angular/forms';
import { XControl, XFormRow } from '@ng-nest/ui/form';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'x-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XThemeComponent)]
})
export class XThemeComponent extends XThemeProperty implements OnInit {
  formGroup = new FormGroup({});

  theme: XTheme = {
    colors: {}
  };
  currentColors: XColorsTheme = {};
  dark = false;
  controls: XControl[] = [
    { control: 'color-picker', id: 'primary', label: '主色', span: 5 },
    { control: 'color-picker', id: 'primary-a100', label: '' },
    { control: 'color-picker', id: 'primary-a200', label: '' },
    { control: 'color-picker', id: 'primary-a300', label: '' },
    { control: 'color-picker', id: 'primary-a400', label: '' },
    { control: 'color-picker', id: 'primary-a500', label: '' },
    { control: 'color-picker', id: 'primary-a600', label: '' },
    { control: 'color-picker', id: 'primary-a700', label: '' },
    { control: 'color-picker', id: 'primary-a800', label: '' },
    { control: 'color-picker', id: 'primary-a900', label: '' },
    { control: 'color-picker', id: 'primary-100', label: '' },
    { control: 'color-picker', id: 'primary-200', label: '' },
    { control: 'color-picker', id: 'primary-300', label: '' },
    { control: 'color-picker', id: 'primary-400', label: '' },
    { control: 'color-picker', id: 'primary-500', label: '' },
    { control: 'color-picker', id: 'primary-600', label: '' },
    { control: 'color-picker', id: 'primary-700', label: '' },
    { control: 'color-picker', id: 'primary-800', label: '' },
    { control: 'color-picker', id: 'primary-900', label: '' },

    { control: 'color-picker', id: 'success', label: '成功', span: 5 },
    { control: 'color-picker', id: 'success-a100', label: '' },
    { control: 'color-picker', id: 'success-a200', label: '' },
    { control: 'color-picker', id: 'success-a300', label: '' },
    { control: 'color-picker', id: 'success-a400', label: '' },
    { control: 'color-picker', id: 'success-a500', label: '' },
    { control: 'color-picker', id: 'success-a600', label: '' },
    { control: 'color-picker', id: 'success-a700', label: '' },
    { control: 'color-picker', id: 'success-a800', label: '' },
    { control: 'color-picker', id: 'success-a900', label: '' },
    { control: 'color-picker', id: 'success-100', label: '' },
    { control: 'color-picker', id: 'success-200', label: '' },
    { control: 'color-picker', id: 'success-300', label: '' },
    { control: 'color-picker', id: 'success-400', label: '' },
    { control: 'color-picker', id: 'success-500', label: '' },
    { control: 'color-picker', id: 'success-600', label: '' },
    { control: 'color-picker', id: 'success-700', label: '' },
    { control: 'color-picker', id: 'success-800', label: '' },
    { control: 'color-picker', id: 'success-900', label: '' },

    { control: 'color-picker', id: 'warning', label: '警告', span: 5 },
    { control: 'color-picker', id: 'warning-a100', label: '' },
    { control: 'color-picker', id: 'warning-a200', label: '' },
    { control: 'color-picker', id: 'warning-a300', label: '' },
    { control: 'color-picker', id: 'warning-a400', label: '' },
    { control: 'color-picker', id: 'warning-a500', label: '' },
    { control: 'color-picker', id: 'warning-a600', label: '' },
    { control: 'color-picker', id: 'warning-a700', label: '' },
    { control: 'color-picker', id: 'warning-a800', label: '' },
    { control: 'color-picker', id: 'warning-a900', label: '' },
    { control: 'color-picker', id: 'warning-100', label: '' },
    { control: 'color-picker', id: 'warning-200', label: '' },
    { control: 'color-picker', id: 'warning-300', label: '' },
    { control: 'color-picker', id: 'warning-400', label: '' },
    { control: 'color-picker', id: 'warning-500', label: '' },
    { control: 'color-picker', id: 'warning-600', label: '' },
    { control: 'color-picker', id: 'warning-700', label: '' },
    { control: 'color-picker', id: 'warning-800', label: '' },
    { control: 'color-picker', id: 'warning-900', label: '' },

    { control: 'color-picker', id: 'danger', label: '危险', span: 5 },
    { control: 'color-picker', id: 'danger-a100', label: '' },
    { control: 'color-picker', id: 'danger-a200', label: '' },
    { control: 'color-picker', id: 'danger-a300', label: '' },
    { control: 'color-picker', id: 'danger-a400', label: '' },
    { control: 'color-picker', id: 'danger-a500', label: '' },
    { control: 'color-picker', id: 'danger-a600', label: '' },
    { control: 'color-picker', id: 'danger-a700', label: '' },
    { control: 'color-picker', id: 'danger-a800', label: '' },
    { control: 'color-picker', id: 'danger-a900', label: '' },
    { control: 'color-picker', id: 'danger-100', label: '' },
    { control: 'color-picker', id: 'danger-200', label: '' },
    { control: 'color-picker', id: 'danger-300', label: '' },
    { control: 'color-picker', id: 'danger-400', label: '' },
    { control: 'color-picker', id: 'danger-500', label: '' },
    { control: 'color-picker', id: 'danger-600', label: '' },
    { control: 'color-picker', id: 'danger-700', label: '' },
    { control: 'color-picker', id: 'danger-800', label: '' },
    { control: 'color-picker', id: 'danger-900', label: '' },

    { control: 'color-picker', id: 'info', label: '信息', span: 5 },
    { control: 'color-picker', id: 'info-a100', label: '' },
    { control: 'color-picker', id: 'info-a200', label: '' },
    { control: 'color-picker', id: 'info-a300', label: '' },
    { control: 'color-picker', id: 'info-a400', label: '' },
    { control: 'color-picker', id: 'info-a500', label: '' },
    { control: 'color-picker', id: 'info-a600', label: '' },
    { control: 'color-picker', id: 'info-a700', label: '' },
    { control: 'color-picker', id: 'info-a800', label: '' },
    { control: 'color-picker', id: 'info-a900', label: '' },
    { control: 'color-picker', id: 'info-100', label: '' },
    { control: 'color-picker', id: 'info-200', label: '' },
    { control: 'color-picker', id: 'info-300', label: '' },
    { control: 'color-picker', id: 'info-400', label: '' },
    { control: 'color-picker', id: 'info-500', label: '' },
    { control: 'color-picker', id: 'info-600', label: '' },
    { control: 'color-picker', id: 'info-700', label: '' },
    { control: 'color-picker', id: 'info-800', label: '' },
    { control: 'color-picker', id: 'info-900', label: '' },

    { control: 'color-picker', id: 'background', label: '背景', span: 5 },
    { control: 'color-picker', id: 'background-a100', label: '' },
    { control: 'color-picker', id: 'background-a200', label: '' },
    { control: 'color-picker', id: 'background-a300', label: '' },
    { control: 'color-picker', id: 'background-a400', label: '' },
    { control: 'color-picker', id: 'background-a500', label: '' },
    { control: 'color-picker', id: 'background-a600', label: '' },
    { control: 'color-picker', id: 'background-a700', label: '' },
    { control: 'color-picker', id: 'background-a800', label: '' },
    { control: 'color-picker', id: 'background-a900', label: '' },
    { control: 'color-picker', id: 'background-100', label: '' },
    { control: 'color-picker', id: 'background-200', label: '' },
    { control: 'color-picker', id: 'background-300', label: '' },
    { control: 'color-picker', id: 'background-400', label: '' },
    { control: 'color-picker', id: 'background-500', label: '' },
    { control: 'color-picker', id: 'background-600', label: '' },
    { control: 'color-picker', id: 'background-700', label: '' },
    { control: 'color-picker', id: 'background-800', label: '' },
    { control: 'color-picker', id: 'background-900', label: '' },

    { control: 'color-picker', id: 'border', label: '边框', span: 5 },
    { control: 'color-picker', id: 'border-a100', label: '' },
    { control: 'color-picker', id: 'border-a200', label: '' },
    { control: 'color-picker', id: 'border-a300', label: '' },
    { control: 'color-picker', id: 'border-a400', label: '' },
    { control: 'color-picker', id: 'border-a500', label: '' },
    { control: 'color-picker', id: 'border-a600', label: '' },
    { control: 'color-picker', id: 'border-a700', label: '' },
    { control: 'color-picker', id: 'border-a800', label: '' },
    { control: 'color-picker', id: 'border-a900', label: '' },
    { control: 'color-picker', id: 'border-100', label: '' },
    { control: 'color-picker', id: 'border-200', label: '' },
    { control: 'color-picker', id: 'border-300', label: '' },
    { control: 'color-picker', id: 'border-400', label: '' },
    { control: 'color-picker', id: 'border-500', label: '' },
    { control: 'color-picker', id: 'border-600', label: '' },
    { control: 'color-picker', id: 'border-700', label: '' },
    { control: 'color-picker', id: 'border-800', label: '' },
    { control: 'color-picker', id: 'border-900', label: '' },

    { control: 'color-picker', id: 'text', label: '文字', span: 5 },
    { control: 'color-picker', id: 'text-a100', label: '' },
    { control: 'color-picker', id: 'text-a200', label: '' },
    { control: 'color-picker', id: 'text-a300', label: '' },
    { control: 'color-picker', id: 'text-a400', label: '' },
    { control: 'color-picker', id: 'text-a500', label: '' },
    { control: 'color-picker', id: 'text-a600', label: '' },
    { control: 'color-picker', id: 'text-a700', label: '' },
    { control: 'color-picker', id: 'text-a800', label: '' },
    { control: 'color-picker', id: 'text-a900', label: '' },
    { control: 'color-picker', id: 'text-100', label: '' },
    { control: 'color-picker', id: 'text-200', label: '' },
    { control: 'color-picker', id: 'text-300', label: '' },
    { control: 'color-picker', id: 'text-400', label: '' },
    { control: 'color-picker', id: 'text-500', label: '' },
    { control: 'color-picker', id: 'text-600', label: '' },
    { control: 'color-picker', id: 'text-700', label: '' },
    { control: 'color-picker', id: 'text-800', label: '' },
    { control: 'color-picker', id: 'text-900', label: '' }
  ];

  value: XColorsTheme = {};

  constructor(public configService: XConfigService, public themeService: XThemeService, public cdr: ChangeDetectorRef) {
    super();
    this.theme = this.configService.getTheme();
    this.currentColors = this.theme.colors as XColorsTheme;
    this.controls.map((x: XControl) => {
      x.value = (this.theme.colors as XColorsTheme)[x.id];
    });
  }
  ngOnInit() {}

  ngAfterViewInit() {
    this.formGroup.valueChanges.pipe(debounceTime(100)).subscribe((x: XColorsTheme) => {
      let changes = this.getChanges(x);
      if (this.isOneAndInColorKeys(changes)) {
        let [key, value] = Object.entries(changes)[0];
        let colors = this.themeService.setRoot(key, value, '');
        Object.assign(x, colors);
        this.currentColors = x;
        this.formGroup.patchValue(x);
      } else {
        this.configService.setTheme({ colors: x });
      }
    });
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
      if (colors[color] !== this.currentColors[color]) {
        result[color] = colors[color];
      }
    }
    return result;
  }

  darkChange($event: Event) {
    if (this.dark) {
      this.currentColors = this.formGroup.value;
      let colors = this.themeService.getDefineColors(
        {
          text: '#d1d1d1',
          border: '#474747',
          background: '#0d0d0d'
        },
        '',
        this.dark
      );

      this.formGroup.patchValue(colors);
    } else {
      this.formGroup.patchValue(this.currentColors as any);
    }
  }
}
