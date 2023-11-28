import { NgModule } from '@angular/core';
import { XDialogComponent } from './dialog.component';
import {
  XDialogActionsDirective,
  XDialogCloseDirective,
  XDialogContentDirective,
  XDialogDragHandleDirective,
  XDialogFullscreenDirective,
  XDialogTitleDirective
} from './dialog-portal.directives';
import { XDialogPortalComponent } from './dialog-portal.component';
import { XDialogContainerComponent } from './dialog-container.component';

@NgModule({
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
    XDialogComponent,
    XDialogContainerComponent,
    XDialogCloseDirective,
    XDialogTitleDirective,
    XDialogContentDirective,
    XDialogActionsDirective,
    XDialogDragHandleDirective,
    XDialogFullscreenDirective,
    XDialogPortalComponent
  ]
})
export class XDialogModule {}
