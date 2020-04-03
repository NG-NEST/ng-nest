import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XDialogComponent } from './dialog.component';
import { XAlertModule } from '@ng-nest/ui/alert';
import { XPortalModule } from '@ng-nest/ui/portal';
import { XButtonModule } from '@ng-nest/ui/button';
import { XIconModule } from '@ng-nest/ui/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XInputModule } from '@ng-nest/ui/input';
import { XOutletModule } from '@ng-nest/ui/outlet';

@NgModule({
  declarations: [XDialogComponent],
  exports: [XDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    XInputModule,
    XButtonModule,
    XIconModule,
    XPortalModule,
    XAlertModule,
    XOutletModule
  ]
})
export class XDialogModule {}
