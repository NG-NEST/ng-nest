import { DOCUMENT } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XColorPickerComponent } from '@ng-nest/ui/color-picker';
import { XComputedStyle, XThemeService } from '@ng-nest/ui/core';
import { XToCssRem } from '@ng-nest/ui/core/functions/cssrem';
import { XDialogModule } from '@ng-nest/ui/dialog';
import { XI18nPipe } from '@ng-nest/ui/i18n';
import { XSliderSelectComponent } from '@ng-nest/ui/slider-select';

@Component({
  selector: 'ns-theme',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    XDialogModule,
    XColorPickerComponent,
    XButtonComponent,
    XI18nPipe,
    XSliderSelectComponent
  ],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss'
})
export class ThemeComponent {
  formBuilder = inject(FormBuilder);
  themeService = inject(XThemeService);
  document = inject(DOCUMENT);
  fontSize = computed(() => parseFloat(XComputedStyle(this.document.documentElement, 'font-size')));
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
      borderRadius: 0
    })
  });

  ngOnInit() {
    const theme = this.themeService.getTheme(false);
    const { colors, vars } = theme;
    const formVars = { ...this.formGroup.controls.vars.value! };
    for (let key in vars) {
      if (key in formVars) {
        (formVars as any)[key] = XToCssRem(vars[key], this.fontSize());
      }
    }
    this.formGroup.patchValue({ colors, vars: formVars });
  }
}
