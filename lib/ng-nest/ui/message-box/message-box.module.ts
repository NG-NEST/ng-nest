import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XMessageBoxComponent } from './message-box.component';
import { XAlertModule } from '@ng-nest/ui/alert';
import { XPortalModule } from '@ng-nest/ui/portal';
import { XMessageBoxServiceModule } from './message-box.service.module';
import { XButtonModule } from '@ng-nest/ui/button';
import { XIconModule } from '@ng-nest/ui/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XInputModule } from '@ng-nest/ui/input';
import { XOutletModule } from '@ng-nest/ui/outlet';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
  declarations: [XMessageBoxComponent],
  exports: [XMessageBoxComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayModule,
    PortalModule,
    XInputModule,
    XButtonModule,
    XIconModule,
    XAlertModule,
    XOutletModule,
    XMessageBoxServiceModule
  ]
})
export class XMessageBoxModule {}
