import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XDropdownModule } from '@ng-nest/ui/dropdown';
import { ExDefaultComponent } from './default/default.component';
import { TeDropdownComponent } from './dropdown.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { XButtonComponent } from '@ng-nest/ui/button';

const routers = [{ path: '', component: TeDropdownComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, XDropdownModule, XLayoutModule, XButtonComponent],
  declarations: [TeDropdownComponent, ExDefaultComponent]
})
export class TeDropdownModule {}
