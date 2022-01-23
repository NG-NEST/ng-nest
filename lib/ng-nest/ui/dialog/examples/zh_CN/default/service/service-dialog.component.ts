import { Component, Inject } from '@angular/core';
import { X_DIALOG_DATA } from '@ng-nest/ui/dialog';
import { XDialogRef } from '@ng-nest/ui/dialog';

@Component({
  selector: 'ex-service-dialog',
  templateUrl: './service-dialog.component.html'
})
export class ExServiceDialogComponent {
  constructor(@Inject(X_DIALOG_DATA) public data: any, public dialogRef: XDialogRef<ExServiceDialogComponent>) {}

  close() {
    this.dialogRef.close();
  }
}
