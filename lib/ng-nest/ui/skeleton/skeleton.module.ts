import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XSkeletonComponent } from './skeleton.component';
import { XFenceModule } from '@ng-nest/ui/fence';

@NgModule({
  declarations: [XSkeletonComponent],
  exports: [XSkeletonComponent],
  imports: [CommonModule, XFenceModule]
})
export class XSkeletonModule {}
