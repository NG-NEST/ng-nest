import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XTreeModule } from '@ng-nest/ui/tree';
import { ExDefaultComponent } from './default/default.component';
import { TeTreeComponent } from './tree.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';

const routers = [{ path: '', component: TeTreeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, XTreeModule, XLayoutModule],
  declarations: [TeTreeComponent, ExDefaultComponent]
})
export class TeTreeModule {}
