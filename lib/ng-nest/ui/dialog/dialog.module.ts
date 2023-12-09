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
    XDialogFullscreenDirective
  ],
  imports: [
    XDialogComponent,
    XDialogContainerComponent,
    XDialogCloseDirective,
    XDialogTitleDirective,
    XDialogContentDirective,
    XDialogActionsDirective,
    XDialogDragHandleDirective,
    XDialogFullscreenDirective
  ]
})
export class XDialogModule {}
