import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XRadioComponent } from './radio.component';
import { FormsModule } from '@angular/forms';
import { XButtonModule } from '@ng-nest/ui/button';
import { XRadioProperty } from './radio.property';
import { XBaseFormModule } from '@ng-nest/ui/base-form';
import { XOutletModule } from '@ng-nest/ui/outlet';

@NgModule({
  declarations: [XRadioComponent, XRadioProperty],
  exports: [XRadioComponent],
  imports: [CommonModule, FormsModule, XButtonModule, XOutletModule, XBaseFormModule]
})
export class XRadioModule {}
