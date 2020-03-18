import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XTransferComponent } from './transfer.component';
import { FormsModule } from '@angular/forms';
import { XIconModule } from '@ng-nest/ui/icon';

@NgModule({
  declarations: [XTransferComponent],
  exports: [XTransferComponent],
  imports: [CommonModule, FormsModule, XIconModule]
})
export class XTransferModule {}
