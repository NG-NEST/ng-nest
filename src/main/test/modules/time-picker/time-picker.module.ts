import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XDatePickerModule } from '@ng-nest/ui/date-picker';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XButtonModule } from '@ng-nest/ui/button';
import { XRadioModule } from '@ng-nest/ui/radio';
import { XSelectModule } from '@ng-nest/ui/select';
import { XInputModule } from '@ng-nest/ui/input';
import { XAutoCompleteModule } from '@ng-nest/ui/auto-complete';
import { XCascadeModule } from '@ng-nest/ui/cascade';
import { XColorPickerModule } from '@ng-nest/ui/color-picker';
import { XFindModule } from '@ng-nest/ui/find';
import { XTextareaModule } from '@ng-nest/ui/textarea';
import { XTimePickerModule } from '@ng-nest/ui/time-picker';
import { TeTimePickerComponent } from './time-picker.component';
import { ExBorderedComponent } from './bordered/bordered.component';
import { ExDefaultComponent } from './default/default.component';
import { ExDisabledComponent } from './disabled/disabled.component';
import { ExHourMinuteComponent } from './hour-minute/hour-minute.component';
import { ExLabelComponent } from './label/label.component';
import { ExRequiredComponent } from './required/required.component';
import { ExSizeComponent } from './size/size.component';
import { ExUse12hoursComponent } from './use12hours/use12hours.component';
import { ExStepComponent } from './step/step.component';
import { ExPresetComponent } from './preset/preset.component';

const routers = [{ path: '', component: TeTimePickerComponent }];

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
    TeTimePickerComponent,
    ExBorderedComponent,
    ExDefaultComponent,
    ExDisabledComponent,
    ExHourMinuteComponent,
    ExLabelComponent,
    ExRequiredComponent,
    ExSizeComponent,
    ExUse12hoursComponent,
    ExStepComponent,
    ExPresetComponent
  ]
})
export class TeTimePickerModule {}
