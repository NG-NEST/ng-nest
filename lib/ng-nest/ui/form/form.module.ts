import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XFormComponent } from './form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { XControlComponent } from './control.component';
import { XFormProperty, XControlProperty } from './form.property';
import { XInputModule } from '@ng-nest/ui/input';
import { XSelectModule } from '@ng-nest/ui/select';
import { XCascadeModule } from '@ng-nest/ui/cascade';
import { XCheckboxModule } from '@ng-nest/ui/checkbox';
import { XColorPickerModule } from '@ng-nest/ui/color-picker';

const modules = [XInputModule, XSelectModule, XCascadeModule, XCheckboxModule, XColorPickerModule];

@NgModule({
  declarations: [XFormComponent, XControlComponent, XFormProperty, XControlProperty],
  exports: [XFormComponent, XControlComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, XLayoutModule, ...modules]
})
export class XFormModule {}
