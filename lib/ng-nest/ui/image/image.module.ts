import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XImageComponent } from './image.component';
import { XIconModule } from '@ng-nest/ui/icon';
import { XImagePreviewProperty, XImageProperty } from './image.property';
import { XDialogModule } from '@ng-nest/ui/dialog';
import { XImagePreviewComponent } from './image-preview.component';
import { XButtonModule } from '@ng-nest/ui/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { XI18nModule } from '@ng-nest/ui/i18n';
import { XImageGroupComponent } from './image-group.component';

@NgModule({
  declarations: [XImageComponent, XImageProperty, XImagePreviewComponent, XImagePreviewProperty, XImageGroupComponent],
  exports: [XImageComponent, XImagePreviewComponent, XImageGroupComponent],
  imports: [CommonModule, XIconModule, XDialogModule, XButtonModule, XI18nModule, DragDropModule]
})
export class XImageModule {}
