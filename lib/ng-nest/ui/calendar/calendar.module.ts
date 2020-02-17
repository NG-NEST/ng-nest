import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { XCalendarComponent } from "./calendar.component";
import { FormsModule } from "@angular/forms";
import { XIconModule } from "@ng-nest/ui/icon";
import { XDatePickerModule } from "@ng-nest/ui/date-picker";
import { XButtonModule } from "@ng-nest/ui/button";

@NgModule({
  declarations: [XCalendarComponent],
  exports: [XCalendarComponent],
  imports: [CommonModule, FormsModule, XIconModule, XDatePickerModule, XButtonModule]
})
export class XCalendarModule {}
