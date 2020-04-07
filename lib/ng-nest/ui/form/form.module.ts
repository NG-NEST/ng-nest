import { XInputModule } from '@ng-nest/ui/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XFormComponent } from './form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { XControlComponent } from './control.component';

@NgModule({
  declarations: [XFormComponent, XControlComponent],
  exports: [XFormComponent, XControlComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, XInputModule, XLayoutModule]
})
export class XFormModule {}
