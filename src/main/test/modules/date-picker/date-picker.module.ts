import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XDatePickerModule } from '@ng-nest/ui/date-picker';
import { ExDefaultComponent } from './default/default.component';
import { TeDatePickerComponent } from './date-picker.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XButtonModule } from '@ng-nest/ui/button';
import { ExYearMonthComponent } from './year-month/year-month.component';
import { ExTodayComponent } from './today/today.component';
import { ExTimeComponent } from './time/time.component';
import { ExSizeComponent } from './size/size.component';
import { ExRequiredComponent } from './required/required.component';
import { ExLabelComponent } from './label/label.component';
import { ExDisabledComponent } from './disabled/disabled.component';
import { ExBorderedComponent } from './bordered/bordered.component';
import { XRadioModule } from '@ng-nest/ui/radio';
import { XSelectModule } from '@ng-nest/ui/select';
import { XInputModule } from '@ng-nest/ui/input';
import { XAutoCompleteModule } from '@ng-nest/ui/auto-complete';
import { XCascadeModule } from '@ng-nest/ui/cascade';
import { XColorPickerModule } from '@ng-nest/ui/color-picker';
import { XFindModule } from '@ng-nest/ui/find';
import { XTextareaModule } from '@ng-nest/ui/textarea';
import { XTimePickerModule } from '@ng-nest/ui/time-picker';

const routers = [{ path: '', component: TeDatePickerComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routers),
    CommonModule,
    FormsModule,
    XLayoutModule,
    XDatePickerModule,
    ReactiveFormsModule,
    XButtonModule,
    XRadioModule,
    XSelectModule,
    XInputModule,
    XAutoCompleteModule,
    XCascadeModule,
    XColorPickerModule,
    XFindModule,
    XTextareaModule,
    XTimePickerModule
  ],
  declarations: [
    TeDatePickerComponent,
    ExDefaultComponent,
    ExYearMonthComponent,
    ExTodayComponent,
    ExTimeComponent,
    ExSizeComponent,
    ExRequiredComponent,
    ExLabelComponent,
    ExDisabledComponent,
    ExBorderedComponent
  ]
})
export class TeDatePickerModule {}
