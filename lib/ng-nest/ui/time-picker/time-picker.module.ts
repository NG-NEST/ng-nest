import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XInputModule } from '@ng-nest/ui/input';
import { XPortalModule } from '@ng-nest/ui/portal';
import { XIconModule } from '@ng-nest/ui/icon';
import { XButtonModule } from '@ng-nest/ui/button';
import { XListModule } from '@ng-nest/ui/list';
import { XBaseFormModule } from '@ng-nest/ui/base-form';
import { XTimePickerComponent } from './time-picker.component';
import { XTimePickerPortalComponent } from './time-picker-portal.component';
import { XTimePickerProperty } from './time-picker.property';
import { XTimePickerFrameComponent } from './time-picker-frame.component';
import { XI18nModule } from '@ng-nest/ui/i18n';

@NgModule({
  declarations: [XTimePickerComponent, XTimePickerPortalComponent, XTimePickerFrameComponent, XTimePickerProperty],
  exports: [XTimePickerComponent, XTimePickerPortalComponent, XTimePickerFrameComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    XPortalModule,
    XInputModule,
    XListModule,
    XButtonModule,
    XIconModule,
    XBaseFormModule,
    XI18nModule
  ]
})
export class XTimePickerModule {}
