import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XTreeFileComponent } from './tree-file.component';
import { XTreeFileProperty } from './tree-file.property';
import { XTreeModule } from '@ng-nest/ui/tree';
import { XHighlightComponent } from '@ng-nest/ui/highlight';
import { XCrumbComponent } from '@ng-nest/ui/crumb';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XLoadingComponent } from '@ng-nest/ui/loading';

@NgModule({
  declarations: [XTreeFileComponent, XTreeFileProperty],
  exports: [XTreeFileComponent],
  imports: [CommonModule, XTreeModule, XLinkComponent, XCrumbComponent, XIconComponent, XLoadingComponent, XHighlightComponent]
})
export class XTreeFileModule {}
