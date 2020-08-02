import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XInputModule } from '@ng-nest/ui/input';
import { XPortalModule } from '@ng-nest/ui/portal';
import { XIconModule } from '@ng-nest/ui/icon';
import { XButtonModule } from '@ng-nest/ui/button';
import { XDatePickerComponent } from './date-picker.component';
import { XDatePickerPortalComponent } from './date-picker-portal.component';
import { XPickerDateComponent } from './picker-date.component';
import { XPickerMonthComponent } from './picker-month.component';
import { XPickerYearComponent } from './picker-year.component';
import { XDatePickerProperty, XPickerDateProperty, XPickerMonthProperty, XPickerYearProperty } from './date-picker.property';
import { XI18nModule } from '@ng-nest/ui/i18n';

@NgModule({
  declarations: [
    XDatePickerComponent,
    XDatePickerPortalComponent,
    XPickerDateComponent,
    XPickerMonthComponent,
    XPickerYearComponent,
    XDatePickerProperty,
    XPickerDateProperty,
    XPickerMonthProperty,
    XPickerYearProperty
  ],
  exports: [XDatePickerComponent, XDatePickerPortalComponent, XPickerDateComponent, XPickerMonthComponent, XPickerYearComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, XPortalModule, XInputModule, XButtonModule, XIconModule, XI18nModule]
})
export class XDatePickerModule {}
