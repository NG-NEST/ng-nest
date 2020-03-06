import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XRadioComponent } from './radio.component';
import { FormsModule } from '@angular/forms';
import { XButtonModule } from '@ng-nest/ui/button';

@NgModule({
  declarations: [XRadioComponent],
  exports: [XRadioComponent],
  imports: [CommonModule, FormsModule, XButtonModule]
})
export class XRadioModule {}
