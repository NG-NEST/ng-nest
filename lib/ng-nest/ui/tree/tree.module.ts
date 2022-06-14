import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { XTreeComponent } from './tree.component';
import { XTreeNodeComponent } from './tree-node.component';
import { XIconModule } from '@ng-nest/ui/icon';
import { XCheckboxModule } from '@ng-nest/ui/checkbox';
import { XOutletModule } from '@ng-nest/ui/outlet';
import { XLinkModule } from '@ng-nest/ui/link';
import { XTreeProperty, XTreeNodeProperty } from './tree.property';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [XTreeComponent, XTreeNodeComponent, XTreeProperty, XTreeNodeProperty],
  exports: [XTreeComponent, XTreeNodeComponent],
  imports: [CommonModule, FormsModule, XIconModule, XCheckboxModule, XOutletModule, XLinkModule, ScrollingModule]
})
export class XTreeModule {}
