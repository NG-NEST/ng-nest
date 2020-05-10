import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XFormComponent } from './form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { XControlComponent } from './control.component';
import { XFormProperty, XControlProperty } from './form.property';
import { XInputModule } from '@ng-nest/ui/input';
import { XSelectModule } from '@ng-nest/ui/select';

const modules = [XInputModule, XSelectModule];

@NgModule({
  declarations: [XFormComponent, XControlComponent, XFormProperty, XControlProperty],
  exports: [XFormComponent, XControlComponent, ...modules],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, XLayoutModule, ...modules]
})
export class XFormModule {}
