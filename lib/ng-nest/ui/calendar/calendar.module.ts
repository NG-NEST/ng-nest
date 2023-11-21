import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XCalendarComponent } from './calendar.component';
import { FormsModule } from '@angular/forms';
import { XDatePickerModule } from '@ng-nest/ui/date-picker';
import { XButtonComponent, XButtonsComponent } from '@ng-nest/ui/button';
import { XRadioModule } from '@ng-nest/ui/radio';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XTooltipModule } from '@ng-nest/ui/tooltip';
import { XCalendarProperty } from './calendar.property';
import { XI18nDirective } from '@ng-nest/ui/i18n';

@NgModule({
  declarations: [XCalendarComponent, XCalendarProperty],
  exports: [XCalendarComponent],
  imports: [
    CommonModule,
    FormsModule,
    XLinkComponent,
    XTooltipModule,
    XRadioModule,
    XDatePickerModule,
    XButtonComponent,
    XButtonsComponent,
    XI18nDirective
  ]
})
export class XCalendarModule {}
