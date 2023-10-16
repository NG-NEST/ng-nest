import { Component, inject } from '@angular/core';
import { X_DIALOG_DATA } from '@ng-nest/ui/dialog';
import { XDialogRef } from '@ng-nest/ui/dialog';

@Component({
  selector: 'ex-service-dialog',
  templateUrl: './service-dialog.component.html'
})
export class ExServiceDialogComponent {
  readonly data = inject(X_DIALOG_DATA);
  readonly dialogRef = inject(XDialogRef<ExServiceDialogComponent>);

  constructor() {}

  close() {
    this.dialogRef.close({ result: 'closed' });
  }
}
