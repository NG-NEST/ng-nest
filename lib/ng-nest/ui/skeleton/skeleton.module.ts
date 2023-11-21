import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XSkeletonComponent } from './skeleton.component';
import { XRowComponent, XColComponent } from '@ng-nest/ui/layout';
import { XSkeletonProperty } from './skeleton.property';

@NgModule({
  declarations: [XSkeletonComponent, XSkeletonProperty],
  exports: [XSkeletonComponent],
  imports: [CommonModule, XRowComponent, XColComponent]
})
export class XSkeletonModule {}
