import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XInputModule } from '@ng-nest/ui/input';
import { ExDefaultComponent } from './default/default.component';
import { TeInputComponent } from './input.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExValidatorComponent } from './validator/validator.component';
import { ExRequiredComponent } from './required/required.component';
import { ExPerpostComponent } from './perpost/perpost.component';
import { XAutoCompleteModule } from '@ng-nest/ui/auto-complete';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XCascadeModule } from '@ng-nest/ui/cascade';
import { XColorPickerModule } from '@ng-nest/ui/color-picker';
import { XDatePickerModule } from '@ng-nest/ui/date-picker';
import { XFindModule } from '@ng-nest/ui/find';
import { XRadioModule } from '@ng-nest/ui/radio';
import { XSelectModule } from '@ng-nest/ui/select';
import { XTextareaModule } from '@ng-nest/ui/textarea';
import { XTimePickerModule } from '@ng-nest/ui/time-picker';

const routers = [{ path: '', component: TeInputComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routers),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    XInputModule,
    XLayoutModule,
    XRadioModule,
    XSelectModule,
    XButtonComponent,
    XDatePickerModule,
    XAutoCompleteModule,
    XCascadeModule,
    XColorPickerModule,
    XFindModule,
    XTextareaModule,
    XTimePickerModule
  ],
  declarations: [TeInputComponent, ExDefaultComponent, ExValidatorComponent, ExRequiredComponent, ExPerpostComponent]
})
export class TeInputModule {}
