import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XFindModule } from '@ng-nest/ui/find';
import { ExTreeTableComponent } from './tree-table/tree-table.component';
import { TeFindComponent } from './find.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExDefaultComponent } from './default/default.component';

const routers = [{ path: '', component: TeFindComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, FormsModule, XFindModule, XLayoutModule],
  declarations: [TeFindComponent, ExDefaultComponent, ExTreeTableComponent]
})
export class TeFindModule {}
