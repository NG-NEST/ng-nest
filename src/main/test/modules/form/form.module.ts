import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XFormModule } from '@ng-nest/ui/form';
import { ExDefaultComponent } from './default/default.component';
import { TeFormComponent } from './form.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExMoreFormComponent } from './more-form/more-form.component';

const routers = [{ path: '', component: TeFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, FormsModule, XFormModule, XLayoutModule],
  declarations: [TeFormComponent, ExDefaultComponent, ExMoreFormComponent]
})
export class TeFormModule {}
