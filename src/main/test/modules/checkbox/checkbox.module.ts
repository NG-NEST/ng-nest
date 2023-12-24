import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XCheckboxModule } from '@ng-nest/ui/checkbox';
import { ExDefaultComponent } from './default/default.component';
import { TeCheckboxComponent } from './checkbox.component';
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
import { ExTagComponent } from './tag/tag.component';
import { XTagModule } from '@ng-nest/ui/tag';
import { ExButtonComponent } from './button/button.component';
import { ExSingleComponent } from './single/single.component';
import { ExVerticalComponent } from './vertical/vertical.component';

const routers = [{ path: '', component: TeCheckboxComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routers),
    CommonModule,
    FormsModule,
    XCheckboxModule,
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
    XInputModule,
    XTagModule
  ],
  declarations: [
    TeCheckboxComponent,
    ExDefaultComponent,
    ExPerpostComponent,
    ExTagComponent,
    ExButtonComponent,
    ExSingleComponent,
    ExVerticalComponent
  ]
})
export class TeCheckboxModule {}
