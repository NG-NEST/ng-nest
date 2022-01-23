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
import { DragDropModule } from '@angular/cdk/drag-drop';
import { XDialogProperty } from './dialog.property';
import {
  XDialogActionsDirective,
  XDialogCloseDirective,
  XDialogContentDirective,
  XDialogTitleDirective
} from './dialog-container.directives';
import { XDialogContainerComponent } from './dialog-container.component';
import { XDialogService } from './dialog.service';

@NgModule({
  declarations: [
    XDialogComponent,
    XDialogCloseDirective,
    XDialogTitleDirective,
    XDialogContentDirective,
    XDialogActionsDirective,
    XDialogContainerComponent,
    XDialogProperty
  ],
  exports: [
    XDialogComponent,
    XDialogCloseDirective,
    XDialogTitleDirective,
    XDialogContentDirective,
    XDialogActionsDirective,
    XDialogContainerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    XInputModule,
    XButtonModule,
    XIconModule,
    XPortalModule,
    XAlertModule,
    XOutletModule
  ],
  providers: [XDialogService]
})
export class XDialogModule {}
