import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XSelectComponent } from './select.component';
import { XInputComponent } from '@ng-nest/ui/input';
import { XListComponent } from '@ng-nest/ui/list';
import { XSelectPortalComponent } from './select-portal.component';
import { XSelectProperty } from './select.property';
import { XControlValueAccessor } from '@ng-nest/ui/base-form';
import { XI18nDirective } from '@ng-nest/ui/i18n';
import { XTagModule } from '@ng-nest/ui/tag';
import { XOutletDirective } from '@ng-nest/ui/outlet';

@NgModule({
  declarations: [XSelectComponent, XSelectPortalComponent, XSelectProperty],
  exports: [XSelectComponent, XSelectPortalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    XInputComponent,
    XListComponent,
    XControlValueAccessor,
    XTagModule,
    XI18nDirective,
    XOutletDirective
  ]
})
export class XSelectModule {}
