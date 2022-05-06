import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XSelectModule } from '@ng-nest/ui/select';
import { ExDefaultComponent } from './default/default.component';
import { TeSelectComponent } from './select.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExMultipleComponent } from './multiple/multiple.component';

const routers = [{ path: '', component: TeSelectComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, FormsModule, XSelectModule, XLayoutModule],
  declarations: [TeSelectComponent, ExDefaultComponent, ExMultipleComponent]
})
export class TeSelectModule {}
