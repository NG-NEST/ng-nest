import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XTreeModule } from '@ng-nest/ui/tree';
import { ExDefaultComponent } from './default/default.component';
import { TeTreeComponent } from './tree.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { ExVirtualScrollComponent } from './virtual-scroll/virtual-scroll.component';
import { ExControlComponent } from './control/control.component';
import { XButtonModule } from '@ng-nest/ui/button';

const routers = [{ path: '', component: TeTreeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, XTreeModule, XLayoutModule, XButtonModule],
  declarations: [TeTreeComponent, ExDefaultComponent, ExVirtualScrollComponent, ExControlComponent]
})
export class TeTreeModule {}
