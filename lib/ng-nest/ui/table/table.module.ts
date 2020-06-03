import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { XTableComponent } from './table.component';
import { XButtonModule } from '@ng-nest/ui/button';
import { XPaginationModule } from '@ng-nest/ui/pagination';
import { XInputModule } from '@ng-nest/ui/input';
import { XOutletModule } from '@ng-nest/ui/outlet';
import { FormsModule } from '@angular/forms';
import { XLinkModule } from '@ng-nest/ui/link';
import { XIconModule } from '@ng-nest/ui/icon';
import { XTableProperty } from './table.property';
import { XTableToolComponent } from './table-tool.component';
import { XTableActionComponent } from './table-action.component';

@NgModule({
  declarations: [XTableComponent, XTableToolComponent, XTableActionComponent, XTableProperty],
  exports: [XTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    ScrollingModule,
    XIconModule,
    XInputModule,
    XButtonModule,
    XPaginationModule,
    XOutletModule,
    XLinkModule
  ]
})
export class XTableModule {}
