import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XTreeSelectComponent } from './tree-select.component';
import { XInputModule } from '@ng-nest/ui/input';
import { XListModule } from '@ng-nest/ui/list';
import { XTreeSelectPortalComponent } from './tree-select-portal.component';
import { XTreeSelectProperty } from './tree-select.property';
import { XControlValueAccessor } from '@ng-nest/ui/base-form';
import { XI18nDirective } from '@ng-nest/ui/i18n';
import { XTagModule } from '@ng-nest/ui/tag';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XTreeModule } from '@ng-nest/ui/tree';
import { XEmptyComponent } from '@ng-nest/ui/empty';

@NgModule({
  declarations: [XTreeSelectComponent, XTreeSelectPortalComponent, XTreeSelectProperty],
  exports: [XTreeSelectComponent, XTreeSelectPortalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    XInputModule,
    XListModule,
    XControlValueAccessor,
    XTagModule,
    XI18nDirective,
    XOutletDirective,
    XTreeModule,
    XEmptyComponent
  ]
})
export class XTreeSelectModule {}
