import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XCrumbComponent } from './crumb.component';
import { XLinkModule } from '@ng-nest/ui/link';
import { XOutletModule } from '@ng-nest/ui/outlet';
import { XCrumbProperty } from './crumb.property';

@NgModule({
  declarations: [XCrumbComponent, XCrumbProperty],
  exports: [XCrumbComponent],
  imports: [CommonModule, XLinkModule, XOutletModule]
})
export class XCrumbModule {}
