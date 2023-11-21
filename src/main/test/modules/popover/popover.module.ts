import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XPopoverModule } from '@ng-nest/ui/popover';
import { ExDefaultComponent } from './default/default.component';
import { TePopoverComponent } from './popover.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { XButtonComponent } from '@ng-nest/ui/button';

const routers = [{ path: '', component: TePopoverComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, XButtonComponent, XPopoverModule, XLayoutModule],
  declarations: [TePopoverComponent, ExDefaultComponent]
})
export class TePopoverModule {}
