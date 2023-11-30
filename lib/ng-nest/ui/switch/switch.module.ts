import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XSwitchComponent } from './switch.component';
import { XSwitchProperty } from './switch.property';
import { XControlValueAccessor } from '@ng-nest/ui/base-form';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XOutletDirective } from '@ng-nest/ui/outlet';

@NgModule({
  declarations: [XSwitchComponent, XSwitchProperty],
  exports: [XSwitchComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, XControlValueAccessor, XLoadingComponent, XOutletDirective]
})
export class XSwitchModule {}
