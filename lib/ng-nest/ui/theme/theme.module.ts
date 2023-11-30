import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XThemeComponent } from './theme.component';
import { XThemeProperty } from './theme.property';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XFormComponent } from '@ng-nest/ui/form';
import { XSwitchModule } from '@ng-nest/ui/switch';
import { XRowComponent, XColComponent } from '@ng-nest/ui/layout';
import { XI18nDirective } from '@ng-nest/ui/i18n';
import { XControlValueAccessor } from '@ng-nest/ui/base-form';

@NgModule({
  declarations: [XThemeComponent, XThemeProperty],
  exports: [XThemeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    XSwitchModule,
    XButtonComponent,
    XRowComponent,
    XColComponent,
    XFormComponent,
    XI18nDirective,
    XControlValueAccessor
  ]
})
export class XThemeModule {}
