import { DOCUMENT } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XColorPickerComponent } from '@ng-nest/ui/color-picker';
import { XColorsTheme, XComputedStyle, XIsNumber, XThemeService, XVarsTheme } from '@ng-nest/ui/core';
import { XToCssRem } from '@ng-nest/ui/core/functions/cssrem';
import { XDialogModule } from '@ng-nest/ui/dialog';
import { XI18nPipe } from '@ng-nest/ui/i18n';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XRadioComponent } from '@ng-nest/ui/radio';
import { XSwitchComponent } from '@ng-nest/ui/switch';

@Component({
  selector: 'ns-theme',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    XDialogModule,
    XColorPickerComponent,
    XButtonComponent,
    XI18nPipe,
    XRadioComponent,
    XSwitchComponent,
    XIconComponent
  ],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss'
})
export class ThemeComponent {
  formBuilder = inject(FormBuilder);
  theme = inject(XThemeService);
  document = inject(DOCUMENT);
  fontSize = computed(() => parseFloat(XComputedStyle(this.document.documentElement, 'font-size')));
  dark = signal(false);
  setDarking = signal(false);
  themeChanged = toSignal(inject(XThemeService).changed, { initialValue: 'light' });
  formGroup = this.formBuilder.group({
    colors: this.formBuilder.group({
      primary: '',
      success: '',
      warning: '',
      danger: '',
      info: '',
      background: '',
      border: '',
      text: ''
    }),
    vars: this.formBuilder.group({
      fontSize: 0,
      borderWidth: 0,
      borderRadius: 0,
      borderSmallRadius: 0
    })
  });

  ngOnInit() {
    const theme = this.theme.getTheme(false);
    const { colors, vars } = theme;
    const formVars = { ...this.formGroup.controls.vars.value! };
    for (let key in vars) {
      if (key in formVars) {
        (formVars as any)[key] = XToCssRem(vars[key], this.fontSize());
      }
    }
    this.formGroup.patchValue({ colors, vars: formVars });

    this.dark.set(this.themeChanged() === 'dark');

    this.formGroup.controls.colors.valueChanges.subscribe((x) => {
      !this.setDarking() && this.theme.setColors(x as XColorsTheme);
    });

    this.formGroup.controls.vars.valueChanges.subscribe((x) => {
      this.theme.setVars(this.addRem(x as XVarsTheme));
    });
  }

  addRem(vars: XVarsTheme) {
    for (let va in vars) {
      if (XIsNumber(vars[va])) {
        vars[va] = `${vars[va]}rem`;
      }
    }
    return vars;
  }

  darkChanged(drak: boolean) {
    this.setDarking.set(true);
    let colors: XColorsTheme;
    if (drak) {
      colors = this.theme.setDark(true);
    } else {
      colors = this.theme.setDark(false);
    }
    this.formGroup.controls.colors.patchValue(colors);
    this.setDarking.set(false);
  }
}
