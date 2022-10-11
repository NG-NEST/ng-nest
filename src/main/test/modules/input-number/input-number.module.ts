import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XInputNumberModule } from '@ng-nest/ui/input-number';
import { ExDefaultComponent } from './default/default.component';
import { TeInputNumberComponent } from './input-number.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { XButtonModule } from '@ng-nest/ui/button';
import { ExFormatComponent } from './format/format.component';

const routers = [{ path: '', component: TeInputNumberComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, FormsModule, XInputNumberModule, XLayoutModule, XButtonModule],
  declarations: [TeInputNumberComponent, ExDefaultComponent, ExFormatComponent]
})
export class TeInputNumberModule {}
