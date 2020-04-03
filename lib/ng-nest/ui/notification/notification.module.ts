import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XNotificationComponent } from './notification.component';
import { XAlertModule } from '@ng-nest/ui/alert';
import { XPortalModule } from '@ng-nest/ui/portal';
import { XNotificationService } from './notification.service';

@NgModule({
  declarations: [XNotificationComponent],
  exports: [XNotificationComponent],
  imports: [CommonModule, XPortalModule, XAlertModule],
  providers: [XNotificationService]
})
export class XNotificationModule {}
