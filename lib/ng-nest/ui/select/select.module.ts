import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XSelectComponent } from './select.component';
import { XInputModule } from '@ng-nest/ui/input';
import { XPortalModule } from '@ng-nest/ui/portal';
import { XListModule } from '@ng-nest/ui/list';
import { XSelectPortalComponent } from './select-portal.component';
import { XSelectProperty } from './select.property';

@NgModule({
  declarations: [XSelectComponent, XSelectPortalComponent, XSelectProperty],
  exports: [XSelectComponent, XSelectPortalComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, XPortalModule, XInputModule, XListModule]
})
export class XSelectModule {}
