import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XSkeletonComponent } from './skeleton.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { XSkeletonProperty } from './skeleton.property';

@NgModule({
  declarations: [XSkeletonComponent, XSkeletonProperty],
  exports: [XSkeletonComponent],
  imports: [CommonModule, XLayoutModule]
})
export class XSkeletonModule {}
