import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XTreeFileComponent } from './tree-file.component';
import { XTreeFileProperty } from './tree-file.property';
import { XTreeModule } from '@ng-nest/ui/tree';
import { XHighlightModule } from '@ng-nest/ui/highlight';
import { XCrumbModule } from '@ng-nest/ui/crumb';
import { XIconModule } from '@ng-nest/ui/icon';
import { XLinkModule } from '@ng-nest/ui/link';
import { XLoadingModule } from '@ng-nest/ui/loading';

@NgModule({
  declarations: [XTreeFileComponent, XTreeFileProperty],
  exports: [XTreeFileComponent],
  imports: [CommonModule, XTreeModule, XLinkModule, XCrumbModule, XIconModule, XLoadingModule, XHighlightModule]
})
export class XTreeFileModule {}
