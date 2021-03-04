import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XUploadComponent } from './upload.component';
import { FormsModule } from '@angular/forms';
import { XButtonModule } from '@ng-nest/ui/button';
import { XIconModule } from '@ng-nest/ui/icon';
import { XUploadProperty } from './upload.property';
import { XI18nModule } from '@ng-nest/ui/i18n';
import { XOutletModule } from '@ng-nest/ui/outlet';
import { XPortalModule } from '@ng-nest/ui/portal';
import { XUploadPortalComponent } from './upload-portal.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [XUploadComponent, XUploadPortalComponent, XUploadProperty],
  exports: [XUploadComponent],
  imports: [CommonModule, FormsModule, DragDropModule, XPortalModule, XOutletModule, XButtonModule, XIconModule, XI18nModule]
})
export class XUploadModule {}
