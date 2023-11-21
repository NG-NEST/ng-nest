import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XTagComponent } from './tag.component';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XTagProperty } from './tag.property';

@NgModule({
  declarations: [XTagComponent, XTagProperty],
  exports: [XTagComponent],
  imports: [CommonModule, XIconComponent, XOutletDirective]
})
export class XTagModule {}
