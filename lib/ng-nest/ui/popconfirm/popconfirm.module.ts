import { NgModule } from '@angular/core';
import { XPopconfirmComponent } from './popconfirm.component';
import { XPopoverModule } from '@ng-nest/ui/popover';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { CommonModule } from '@angular/common';
import { XPopconfirmProperty } from './popconfirm.property';

@NgModule({
  declarations: [XPopconfirmComponent, XPopconfirmProperty],
  exports: [XPopconfirmComponent],
  imports: [CommonModule, XPopoverModule, XButtonComponent, XIconComponent, XOutletDirective]
})
export class XPopconfirmModule {}
