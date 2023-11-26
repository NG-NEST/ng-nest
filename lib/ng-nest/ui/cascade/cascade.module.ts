import { NgModule } from '@angular/core';
import { XCascadeComponent } from './cascade.component';
import { XCascadePortalComponent } from './cascade-portal.component';

@NgModule({
  exports: [XCascadeComponent, XCascadePortalComponent],
  imports: [XCascadeComponent, XCascadePortalComponent]
})
export class XCascadeModule {}
