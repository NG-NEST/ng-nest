import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XTagComponent } from './tag.component';
import { XIconModule } from '@ng-nest/ui/icon';
import { XOutletModule } from '@ng-nest/ui/outlet';
import { XTagProperty } from './tag.property';

@NgModule({
  declarations: [XTagComponent, XTagProperty],
  exports: [XTagComponent],
  imports: [CommonModule, XIconModule, XOutletModule]
})
export class XTagModule {}
