import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XSelectComponent } from './select.component';
import { XInputModule } from '@ng-nest/ui/input';
import { XPortalModule } from '@ng-nest/ui/portal';
import { XListModule } from '@ng-nest/ui/list';
import { XSelectPortalComponent } from './select-portal.component';

@NgModule({
  declarations: [XSelectComponent, XSelectPortalComponent],
  exports: [XSelectComponent, XSelectPortalComponent],
  entryComponents: [XSelectPortalComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, XPortalModule, XInputModule, XListModule]
})
export class XSelectModule {}
