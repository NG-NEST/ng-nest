import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XTreeSelectModule } from '@ng-nest/ui/tree-select';
import { ExDefaultComponent } from './default/default.component';
import { TeTreeSelectComponent } from './tree-select.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { XInputModule } from '@ng-nest/ui/input';
import { XRadioModule } from '@ng-nest/ui/radio';
import { XSelectModule } from '@ng-nest/ui/select';

const routers = [{ path: '', component: TeTreeSelectComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routers),
    CommonModule,
    FormsModule,
    XTreeSelectModule,
    XRadioModule,
    XLayoutModule,
    XInputModule,
    XSelectModule
  ],
  declarations: [TeTreeSelectComponent, ExDefaultComponent]
})
export class TeTreeSelectModule {}
