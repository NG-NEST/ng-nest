import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XSwitchComponent } from './switch.component';
import { XSwitchProperty } from './switch.property';

@NgModule({
  declarations: [XSwitchComponent, XSwitchProperty],
  exports: [XSwitchComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class XSwitchModule {}
