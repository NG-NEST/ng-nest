import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { XOutletModule } from '@ng-nest/ui/outlet';
import { XDescriptionItemComponent } from './description-item.component';
import { XDescriptionComponent } from './description.component';
import { XDescriptionItemProperty, XDescriptionProperty } from './description.property';

@NgModule({
  declarations: [XDescriptionComponent, XDescriptionProperty, XDescriptionItemComponent, XDescriptionItemProperty],
  exports: [XDescriptionComponent, XDescriptionItemComponent],
  imports: [CommonModule, XOutletModule]
})
export class XDescriptionModule {}
