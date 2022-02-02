import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XMenuModule } from '@ng-nest/ui/menu';
import { ExDefaultComponent } from './default/default.component';
import { TeMenuComponent } from './menu.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { ExWidthComponent } from './width/width.component';

const routers = [{ path: '', component: TeMenuComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, XMenuModule, XLayoutModule],
  declarations: [TeMenuComponent, ExDefaultComponent, ExWidthComponent]
})
export class TeMenuModule {}
