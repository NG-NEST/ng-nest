import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XCalendarComponent } from './calendar.component';
import { FormsModule } from '@angular/forms';
import { XDatePickerModule } from '@ng-nest/ui/date-picker';
import { XButtonModule } from '@ng-nest/ui/button';
import { XRadioModule } from '@ng-nest/ui/radio';
import { XLinkModule } from '@ng-nest/ui/link';
import { XTooltipModule } from '@ng-nest/ui/tooltip';
import { XCalendarProperty } from './calendar.property';
import { XI18nModule } from '@ng-nest/ui/i18n';

@NgModule({
  declarations: [XCalendarComponent, XCalendarProperty],
  exports: [XCalendarComponent],
  imports: [CommonModule, FormsModule, XLinkModule, XTooltipModule, XRadioModule, XDatePickerModule, XButtonModule, XI18nModule]
})
export class XCalendarModule {}
