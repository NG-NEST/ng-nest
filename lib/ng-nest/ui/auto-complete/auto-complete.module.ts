import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XAutoCompleteComponent } from './auto-complete.component';
import { XInputModule } from '@ng-nest/ui/input';
import { XPortalModule } from '@ng-nest/ui/portal';
import { XListModule } from '@ng-nest/ui/list';
import { XControlValueAccessor } from '@ng-nest/ui/base-form';
import { XAutoCompletePortalComponent } from './auto-complete-portal.component';
import { XAutoCompleteProperty } from './auto-complete.property';

@NgModule({
  declarations: [XAutoCompleteComponent, XAutoCompletePortalComponent, XAutoCompleteProperty],
  exports: [XAutoCompleteComponent, XAutoCompletePortalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    XPortalModule,
    XInputModule,
    XListModule,
    XControlValueAccessor
  ]
})
export class XAutoCompleteModule {}
