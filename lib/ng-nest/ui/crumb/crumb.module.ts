import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XCrumbComponent } from './crumb.component';

@NgModule({
  declarations: [XCrumbComponent],
  exports: [XCrumbComponent],
  imports: [CommonModule]
})
export class XCrumbModule {}
