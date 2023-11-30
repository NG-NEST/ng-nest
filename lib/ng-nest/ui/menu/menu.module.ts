import { NgModule } from '@angular/core';
import { XMenuComponent } from './menu.component';
import { XMenuNodeComponent } from './menu-node.component';

@NgModule({
  exports: [XMenuComponent, XMenuNodeComponent],
  imports: [XMenuComponent, XMenuNodeComponent]
})
export class XMenuModule {}
