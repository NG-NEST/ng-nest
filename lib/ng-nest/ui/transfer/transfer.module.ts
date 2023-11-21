import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XTransferComponent } from './transfer.component';
import { FormsModule } from '@angular/forms';
import { XCheckboxModule } from '@ng-nest/ui/checkbox';
import { XButtonComponent } from '@ng-nest/ui/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { XInputModule } from '@ng-nest/ui/input';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XTransferProperty } from './transfer.property';
import { XControlValueAccessor } from '@ng-nest/ui/base-form';
import { XTreeModule } from '@ng-nest/ui/tree';
import { XTableModule } from '@ng-nest/ui/table';
import { XKeywordModule } from '@ng-nest/ui/keyword';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XI18nPipe } from '@ng-nest/ui/i18n';

@NgModule({
  declarations: [XTransferComponent, XTransferProperty],
  exports: [XTransferComponent],
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    XOutletDirective,
    XCheckboxModule,
    XButtonComponent,
    XInputModule,
    XControlValueAccessor,
    XTreeModule,
    XTableModule,
    XKeywordModule,
    XLinkComponent,
    XI18nPipe
  ]
})
export class XTransferModule {}
