import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XTransferComponent } from './transfer.component';
import { FormsModule } from '@angular/forms';
import { XCheckboxModule } from '@ng-nest/ui/checkbox';
import { XButtonModule } from '@ng-nest/ui/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { XInputModule } from '@ng-nest/ui/input';
import { XOutletModule } from '@ng-nest/ui/outlet';

@NgModule({
  declarations: [XTransferComponent],
  exports: [XTransferComponent],
  imports: [CommonModule, FormsModule, DragDropModule, XOutletModule, XCheckboxModule, XButtonModule, XInputModule]
})
export class XTransferModule {}
