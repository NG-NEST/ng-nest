import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XSkeletonComponent } from './skeleton.component';
import { XLayoutModule } from '@ng-nest/ui/layout';

@NgModule({
  declarations: [XSkeletonComponent],
  exports: [XSkeletonComponent],
  imports: [CommonModule, XLayoutModule]
})
export class XSkeletonModule {}
