import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XDropdownComponent } from './dropdown.component';
import { XDropdownPortalComponent } from './dropdown-portal.component';
import { XPortalModule } from '@ng-nest/ui/portal';
import { XListModule } from '@ng-nest/ui/list';

@NgModule({
  declarations: [XDropdownComponent, XDropdownPortalComponent],
  exports: [XDropdownComponent, XDropdownPortalComponent],
  imports: [CommonModule, XPortalModule, XListModule]
})
export class XDropdownModule {}
