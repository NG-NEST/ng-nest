import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XTabsModule } from '@ng-nest/ui/tabs';
import { ExDefaultComponent } from './default/default.component';
import { TeTabsComponent } from './tabs.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';

const routers = [{ path: '', component: TeTabsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, XTabsModule, XLayoutModule],
  declarations: [TeTabsComponent, ExDefaultComponent]
})
export class TeTabsModule {}
