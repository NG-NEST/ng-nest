import { NgModule } from '@angular/core';
import { XImageComponent } from './image.component';
import { XImagePreviewComponent } from './image-preview.component';
import { XImageGroupComponent } from './image-group.component';

@NgModule({
  exports: [XImageComponent, XImagePreviewComponent, XImageGroupComponent],
  imports: [XImageComponent, XImagePreviewComponent, XImageGroupComponent]
})
export class XImageModule {}
