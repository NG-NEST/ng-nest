import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XCheckboxComponent } from './checkbox.component';
import { FormsModule } from '@angular/forms';
import { XButtonComponent, XButtonsComponent } from '@ng-nest/ui/button';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XCheckboxProperty } from './checkbox.property';
import { XControlValueAccessor } from '@ng-nest/ui/base-form';
import { XTagModule } from '@ng-nest/ui/tag';

@NgModule({
  declarations: [XCheckboxComponent, XCheckboxProperty],
  exports: [XCheckboxComponent],
  imports: [
    CommonModule,
    FormsModule,
    XButtonComponent,
    XButtonsComponent,
    XTagModule,
    XOutletDirective,
    XControlValueAccessor
  ]
})
export class XCheckboxModule {}
