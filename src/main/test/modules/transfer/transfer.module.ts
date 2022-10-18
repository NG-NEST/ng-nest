import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XTransferModule } from '@ng-nest/ui/transfer';
import { ExDefaultComponent } from './default/default.component';
import { TeTransferComponent } from './transfer.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { ExTreeComponent } from './tree/tree.component';
import { FormsModule } from '@angular/forms';
import { ExCustomComponent } from './custom/custom.component';
import { ExDragComponent } from './drag/drag.component';
import { XIconModule } from '@ng-nest/ui/icon';
import { XTreeModule } from '@ng-nest/ui/tree';
import { ExTableComponent } from './table/table.component';
import { XTableModule } from '@ng-nest/ui/table';

const routers = [{ path: '', component: TeTransferComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routers),
    CommonModule,
    FormsModule,
    XTransferModule,
    XLayoutModule,
    XIconModule,
    XTreeModule,
    XTableModule
  ],
  declarations: [TeTransferComponent, ExDefaultComponent, ExCustomComponent, ExDragComponent, ExTreeComponent, ExTableComponent]
})
export class TeTransferModule {}
