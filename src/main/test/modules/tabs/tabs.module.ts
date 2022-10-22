import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XTabsModule } from '@ng-nest/ui/tabs';
import { ExDefaultComponent } from './default/default.component';
import { TeTabsComponent } from './tabs.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { ExActionComponent } from './action/action.component';
import { XButtonModule } from '@ng-nest/ui/button';
import { XIconModule } from '@ng-nest/ui/icon';
import { ExExpandComponent } from './expand/expand.component';
import { ExRouterComponent } from './router/router.component';

const routers = [{ path: '', component: TeTabsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, XTabsModule, XLayoutModule, XButtonModule, XIconModule],
  declarations: [TeTabsComponent, ExDefaultComponent, ExActionComponent, ExExpandComponent, ExRouterComponent]
})
export class TeTabsModule {}
