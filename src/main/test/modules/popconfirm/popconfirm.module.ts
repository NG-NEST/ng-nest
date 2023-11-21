import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XPopconfirmModule } from '@ng-nest/ui/popconfirm';
import { ExDefaultComponent } from './default/default.component';
import { TePopconfirmComponent } from './popconfirm.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { XButtonComponent } from '@ng-nest/ui/button';
import { ExAsyncCloseComponent } from './async-close/async-close.component';
import { ExConditionComponent } from './condition/condition.component';
import { XSwitchModule } from '@ng-nest/ui/switch';
import { FormsModule } from '@angular/forms';
import { XMessageModule } from '@ng-nest/ui/message';

const routers = [{ path: '', component: TePopconfirmComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routers),
    CommonModule,
    XPopconfirmModule,
    XLayoutModule,
    XButtonComponent,
    FormsModule,
    XSwitchModule,
    XMessageModule
  ],
  declarations: [TePopconfirmComponent, ExDefaultComponent, ExAsyncCloseComponent, ExConditionComponent]
})
export class TePopconfirmModule {}
