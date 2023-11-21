import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XImageComponent } from './image.component';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XImagePreviewProperty, XImageProperty } from './image.property';
import { XDialogModule } from '@ng-nest/ui/dialog';
import { XImagePreviewComponent } from './image-preview.component';
import { XButtonComponent } from '@ng-nest/ui/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { XImageGroupComponent } from './image-group.component';
import { XOutletDirective } from '@ng-nest/ui/outlet';

@NgModule({
  declarations: [
    XImageComponent,
    XImageProperty,
    XImagePreviewComponent,
    XImagePreviewProperty,
    XImageGroupComponent
  ],
  exports: [XImageComponent, XImagePreviewComponent, XImageGroupComponent],
  imports: [
    CommonModule,
    XIconComponent,
    XDialogModule,
    XButtonComponent,
    XOutletDirective,
    DragDropModule
  ]
})
export class XImageModule {}
