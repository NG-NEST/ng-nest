import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XTransferModule } from '@ng-nest/ui/transfer';
import { ExDefaultComponent } from './default/default.component';
import { TeTransferComponent } from './transfer.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { ExTreeComponent } from './tree/tree.component';
import { FormsModule } from '@angular/forms';

const routers = [{ path: '', component: TeTransferComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, FormsModule, XTransferModule, XLayoutModule],
  declarations: [TeTransferComponent, ExDefaultComponent, ExTreeComponent]
})
export class TeTransferModule {}
