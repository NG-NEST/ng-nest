import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { XTreeComponent } from './tree.component';
import { XTreeNodeComponent } from './tree-node.component';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XCheckboxModule } from '@ng-nest/ui/checkbox';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XTreeProperty, XTreeNodeProperty } from './tree.property';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { XKeywordDirective } from '@ng-nest/ui/keyword';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [XTreeComponent, XTreeNodeComponent, XTreeProperty, XTreeNodeProperty],
  exports: [XTreeComponent, XTreeNodeComponent],
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    XIconComponent,
    XCheckboxModule,
    XOutletDirective,
    XLinkComponent,
    ScrollingModule,
    XKeywordDirective
  ]
})
export class XTreeModule {}
