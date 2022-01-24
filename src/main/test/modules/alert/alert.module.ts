import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XAlertModule } from '@ng-nest/ui/alert';
import { ExDefaultComponent } from './default/default.component';
import { TeAlertComponent } from './alert.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { ExCustomComponent } from './custom/custom.component';

const routers = [{ path: '', component: TeAlertComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, XAlertModule, XLayoutModule],
  declarations: [TeAlertComponent, ExDefaultComponent, ExCustomComponent]
})
export class TeAlertModule {}
