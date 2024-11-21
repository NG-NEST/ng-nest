import { Component, inject } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import {
  XDialogActionsDirective,
  XDialogCloseDirective,
  XDialogContentDirective,
  XDialogDragHandleDirective,
  XDialogFullscreenDirective,
  XDialogTitleDirective,
  X_DIALOG_DATA
} from '@ng-nest/ui/dialog';
import { XDialogRef } from '@ng-nest/ui/dialog';

@Component({
  selector: 'ex-service-dialog',
  imports: [
    XButtonComponent,
    XDialogTitleDirective,
    XDialogDragHandleDirective,
    XDialogContentDirective,
    XDialogActionsDirective,
    XDialogFullscreenDirective,
    XDialogCloseDirective
  ],
  templateUrl: './service-dialog.component.html'
})
export class ExServiceDialogComponent {
  data = inject(X_DIALOG_DATA);
  dialogRef = inject(XDialogRef<ExServiceDialogComponent>);

  close() {
    this.dialogRef.close();
  }
}
