import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XCascadeComponent } from './cascade.component';
import { XCascadePortalComponent } from './cascade-portal.component';
import { XInputModule } from '@ng-nest/ui/input';
import { XListModule } from '@ng-nest/ui/list';
import { XPortalModule } from '@ng-nest/ui/portal';
import { XCascadeProperty } from './cascade.property';

@NgModule({
  declarations: [XCascadeComponent, XCascadePortalComponent, XCascadeProperty],
  exports: [XCascadeComponent, XCascadePortalComponent],
  imports: [CommonModule, FormsModule, XPortalModule, ReactiveFormsModule, XInputModule, XListModule]
})
export class XCascadeModule {}
