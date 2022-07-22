import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XSelectModule } from '@ng-nest/ui/select';
import { ExDefaultComponent } from './default/default.component';
import { TeSelectComponent } from './select.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExMultipleComponent } from './multiple/multiple.component';
import { ExSearchComponent } from './search/search.component';
import { XInputModule } from '@ng-nest/ui/input';

const routers = [{ path: '', component: TeSelectComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, FormsModule, XSelectModule, XLayoutModule, XInputModule],
  declarations: [TeSelectComponent, ExDefaultComponent, ExMultipleComponent, ExSearchComponent]
})
export class TeSelectModule {}
