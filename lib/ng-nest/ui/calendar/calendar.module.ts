import { NgModule } from '@angular/core';
import { XCalendarComponent } from './calendar.component';

@NgModule({
  exports: [XCalendarComponent],
  imports: [XCalendarComponent]
})
export class XCalendarModule {}
