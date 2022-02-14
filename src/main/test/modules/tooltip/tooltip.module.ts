import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XTooltipModule } from '@ng-nest/ui/tooltip';
import { ExDefaultComponent } from './default/default.component';
import { TeTooltipComponent } from './tooltip.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { XButtonModule } from '@ng-nest/ui/button';

const routers = [{ path: '', component: TeTooltipComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, XButtonModule, XTooltipModule, XLayoutModule],
  declarations: [TeTooltipComponent, ExDefaultComponent]
})
export class TeTooltipModule {}
