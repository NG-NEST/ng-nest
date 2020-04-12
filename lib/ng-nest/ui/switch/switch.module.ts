import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XSwitchComponent } from './switch.component';

@NgModule({
  declarations: [XSwitchComponent],
  exports: [XSwitchComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class XSwitchModule {}
