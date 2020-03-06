import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XCheckboxComponent } from './checkbox.component';
import { FormsModule } from '@angular/forms';
import { XButtonModule } from '@ng-nest/ui/button';

@NgModule({
  declarations: [XCheckboxComponent],
  exports: [XCheckboxComponent],
  imports: [CommonModule, FormsModule, XButtonModule]
})
export class XCheckboxModule {}
