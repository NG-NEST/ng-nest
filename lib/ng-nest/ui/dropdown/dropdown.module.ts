import { NgModule } from '@angular/core';
import { XDropdownComponent } from './dropdown.component';
import { XDropdownPortalComponent } from './dropdown-portal.component';

@NgModule({
  imports: [XDropdownComponent, XDropdownPortalComponent],
  exports: [XDropdownComponent, XDropdownPortalComponent]
})
export class XDropdownModule {}
