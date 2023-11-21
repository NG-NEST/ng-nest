import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XStepsModule } from '@ng-nest/ui/steps';
import { ExDefaultComponent } from './default/default.component';
import { TeStepsComponent } from './steps.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';
import { ExNodeStatusComponent } from './node-status/node-status.component';

const routers = [{ path: '', component: TeStepsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, FormsModule, XStepsModule, XButtonComponent, XLayoutModule],
  declarations: [TeStepsComponent, ExDefaultComponent, ExNodeStatusComponent]
})
export class TeStepsModule {}
