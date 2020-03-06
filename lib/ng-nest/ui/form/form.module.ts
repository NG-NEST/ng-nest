import { XInputModule } from '@ng-nest/ui/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XFormComponent } from './form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XFenceModule } from '@ng-nest/ui/fence';
import { XControlComponent } from './control.component';

@NgModule({
  declarations: [XFormComponent, XControlComponent],
  exports: [XFormComponent, XControlComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, XInputModule, XFenceModule]
})
export class XFormModule {}
