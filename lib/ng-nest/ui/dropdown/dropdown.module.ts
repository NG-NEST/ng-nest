import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XDropdownComponent } from './dropdown.component';
import { XDropdownPortalComponent } from './dropdown-portal.component';
import { XPortalModule } from '@ng-nest/ui/portal';
import { XListModule } from '@ng-nest/ui/list';
import { XDropdownProperty } from './dropdown.property';

@NgModule({
  declarations: [XDropdownComponent, XDropdownPortalComponent, XDropdownProperty],
  exports: [XDropdownComponent, XDropdownPortalComponent],
  imports: [CommonModule, XPortalModule, XListModule],
  entryComponents: [XDropdownPortalComponent]
})
export class XDropdownModule {}
