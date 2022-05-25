import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XDropdownComponent } from './dropdown.component';
import { XDropdownPortalComponent } from './dropdown-portal.component';
import { XPortalModule } from '@ng-nest/ui/portal';
import { XListModule } from '@ng-nest/ui/list';
import { XDropdownProperty } from './dropdown.property';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [XDropdownComponent, XDropdownPortalComponent, XDropdownProperty],
  exports: [XDropdownComponent, XDropdownPortalComponent],
  imports: [CommonModule, XPortalModule, XListModule, FormsModule]
})
export class XDropdownModule {}
