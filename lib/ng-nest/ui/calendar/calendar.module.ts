import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XCalendarComponent } from './calendar.component';
import { FormsModule } from '@angular/forms';
import { XIconModule } from '@ng-nest/ui/icon';
import { XDatePickerModule } from '@ng-nest/ui/date-picker';
import { XButtonModule } from '@ng-nest/ui/button';
import { XRadioModule } from '@ng-nest/ui/radio';
import { XLinkModule } from '@ng-nest/ui/link';
import { XTooltipModule } from '@ng-nest/ui/tooltip';

@NgModule({
  declarations: [XCalendarComponent],
  exports: [XCalendarComponent],
  imports: [
    CommonModule,
    FormsModule,
    XIconModule,
    XLinkModule,
    XTooltipModule,
    XRadioModule,
    XDatePickerModule,
    XButtonModule
  ]
})
export class XCalendarModule {}
