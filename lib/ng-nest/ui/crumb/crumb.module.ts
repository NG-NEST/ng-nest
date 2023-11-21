import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XCrumbComponent } from './crumb.component';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XCrumbProperty } from './crumb.property';

@NgModule({
  declarations: [XCrumbComponent, XCrumbProperty],
  exports: [XCrumbComponent],
  imports: [CommonModule, XLinkComponent, XOutletDirective]
})
export class XCrumbModule {}
