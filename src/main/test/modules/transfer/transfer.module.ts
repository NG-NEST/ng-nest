import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XTransferModule } from '@ng-nest/ui/transfer';
import { ExDefaultComponent } from './default/default.component';
import { TeTransferComponent } from './transfer.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { ExTreeComponent } from './tree/tree.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExCustomComponent } from './custom/custom.component';
import { ExDragComponent } from './drag/drag.component';
import { XIconModule } from '@ng-nest/ui/icon';
import { XTreeModule } from '@ng-nest/ui/tree';
import { ExTableComponent } from './table/table.component';
import { XTableModule } from '@ng-nest/ui/table';
import { ExFooterComponent } from './footer/footer.component';
import { XButtonModule } from '@ng-nest/ui/button';
import { ExSearchComponent } from './search/search.component';
import { XSelectModule } from '@ng-nest/ui/select';
import { XInputModule } from '@ng-nest/ui/input';

const routers = [{ path: '', component: TeTransferComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routers),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    XTransferModule,
    XButtonModule,
    XLayoutModule,
    XIconModule,
    XTreeModule,
    XTableModule,
    XSelectModule,
    XInputModule
  ],
  declarations: [
    TeTransferComponent,
    ExDefaultComponent,
    ExCustomComponent,
    ExDragComponent,
    ExTreeComponent,
    ExTableComponent,
    ExFooterComponent,
    ExSearchComponent
  ]
})
export class TeTransferModule {}
