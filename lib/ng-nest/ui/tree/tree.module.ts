import { NgModule } from '@angular/core';
import { XTreeComponent } from './tree.component';
import { XTreeNodeComponent } from './tree-node.component';

@NgModule({
  exports: [XTreeComponent, XTreeNodeComponent],
  imports: [XTreeComponent, XTreeNodeComponent]
})
export class XTreeModule {}
