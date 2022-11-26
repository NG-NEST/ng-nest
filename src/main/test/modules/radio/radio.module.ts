import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XRadioModule } from '@ng-nest/ui/radio';
import { ExDefaultComponent } from './default/default.component';
import { TeRadioComponent } from './radio.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { ExPerpostComponent } from './perpost/perpost.component';
import { XSelectModule } from '@ng-nest/ui/select';
import { XDatePickerModule } from '@ng-nest/ui/date-picker';
import { XAutoCompleteModule } from '@ng-nest/ui/auto-complete';
import { XCascadeModule } from '@ng-nest/ui/cascade';
import { XColorPickerModule } from '@ng-nest/ui/color-picker';
import { XFindModule } from '@ng-nest/ui/find';
import { XTextareaModule } from '@ng-nest/ui/textarea';
import { XTimePickerModule } from '@ng-nest/ui/time-picker';
import { XButtonModule } from '@ng-nest/ui/button';
import { XInputModule } from '@ng-nest/ui/input';
import { FormsModule } from '@angular/forms';

const routers = [{ path: '', component: TeRadioComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routers),
    CommonModule,
    FormsModule,
    XRadioModule,
    XLayoutModule,
    XAutoCompleteModule,
    XSelectModule,
    XDatePickerModule,
    XButtonModule,
    XLayoutModule,
    XCascadeModule,
    XColorPickerModule,
    XFindModule,
    XTextareaModule,
    XTimePickerModule,
    XInputModule
  ],
  declarations: [TeRadioComponent, ExDefaultComponent, ExPerpostComponent]
})
export class TeRadioModule {}
