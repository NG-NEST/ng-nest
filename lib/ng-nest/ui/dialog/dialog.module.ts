import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XDialogComponent } from './dialog.component';
import { XAlertComponent } from '@ng-nest/ui/alert';
import { XPortalModule } from '@ng-nest/ui/portal';
import { XButtonComponent, XButtonsComponent } from '@ng-nest/ui/button';
import { XIconComponent } from '@ng-nest/ui/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XInputModule } from '@ng-nest/ui/input';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XResizableDirective } from '@ng-nest/ui/resizable';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { XDialogContainerProperty, XDialogProperty } from './dialog.property';
import {
  XDialogActionsDirective,
  XDialogCloseDirective,
  XDialogContentDirective,
  XDialogDragHandleDirective,
  XDialogFullscreenDirective,
  XDialogTitleDirective
} from './dialog-portal.directives';
import { XDialogPortalComponent } from './dialog-portal.component';
import { XDialogService } from './dialog.service';
import { XDialogContainerComponent } from './dialog-container.component';
import { XI18nDirective } from '@ng-nest/ui/i18n';

@NgModule({
  declarations: [
    XDialogComponent,
    XDialogContainerComponent,
    XDialogCloseDirective,
    XDialogTitleDirective,
    XDialogContentDirective,
    XDialogActionsDirective,
    XDialogDragHandleDirective,
    XDialogFullscreenDirective,
    XDialogPortalComponent,
    XDialogProperty,
    XDialogContainerProperty
  ],
  exports: [
    XDialogComponent,
    XDialogContainerComponent,
    XDialogCloseDirective,
    XDialogTitleDirective,
    XDialogContentDirective,
    XDialogActionsDirective,
    XDialogDragHandleDirective,
    XDialogFullscreenDirective,
    XDialogPortalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    XInputModule,
    XButtonComponent,
    XButtonsComponent,
    XIconComponent,
    XPortalModule,
    XAlertComponent,
    XOutletDirective,
    XResizableDirective,
    XI18nDirective
  ],
  providers: [XDialogService]
})
export class XDialogModule {}
