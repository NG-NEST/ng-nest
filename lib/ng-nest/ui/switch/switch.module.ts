import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XSwitchComponent } from './switch.component';
import { XIconModule } from '@ng-nest/ui/icon';

@NgModule({
  declarations: [XSwitchComponent],
  exports: [XSwitchComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, XIconModule]
})
export class XSwitchModule {}
