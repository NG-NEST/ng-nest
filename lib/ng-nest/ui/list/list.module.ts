import { NgModule } from '@angular/core';
import { XListComponent } from './list.component';
import { XListOptionComponent } from './list-option.component';
import { XListDropGroup } from './list-drop-group.directive';

@NgModule({
  exports: [XListComponent, XListDropGroup, XListOptionComponent],
  imports: [XListComponent, XListDropGroup, XListOptionComponent]
})
export class XListModule {}
