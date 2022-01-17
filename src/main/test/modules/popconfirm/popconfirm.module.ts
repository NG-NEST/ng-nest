import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XPopconfirmModule } from '@ng-nest/ui/popconfirm';
import { ExDefaultComponent } from './default/default.component';
import { TePopconfirmComponent } from './popconfirm.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { XButtonModule } from '@ng-nest/ui/button';
import { ExAsyncCloseComponent } from './async-close/async-close.component';

const routers = [{ path: '', component: TePopconfirmComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, XPopconfirmModule, XLayoutModule, XButtonModule],
  declarations: [TePopconfirmComponent, ExDefaultComponent, ExAsyncCloseComponent]
})
export class TePopconfirmModule {}
