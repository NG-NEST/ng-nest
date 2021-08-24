import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XInputComponent } from './input.component';
import { XIconModule } from '@ng-nest/ui/icon';
import { XInputGroupProperty, XInputProperty } from './input.property';
import { XBaseFormModule } from '@ng-nest/ui/base-form';
import { XInputGroupComponent } from './input-group.component';
import { XOutletModule } from '@ng-nest/ui/outlet';

@NgModule({
  declarations: [XInputComponent, XInputProperty, XInputGroupComponent, XInputGroupProperty],
  exports: [XInputComponent, XInputGroupComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, XIconModule, XBaseFormModule, XOutletModule]
})
export class XInputModule {}
