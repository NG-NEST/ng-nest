import { NgModule } from '@angular/core';
import { XDescriptionItemComponent } from './description-item.component';
import { XDescriptionComponent } from './description.component';

@NgModule({
  imports: [XDescriptionComponent, XDescriptionItemComponent],
  exports: [XDescriptionComponent, XDescriptionItemComponent],
})
export class XDescriptionModule {}
