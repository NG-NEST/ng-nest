import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XNotificationComponent } from './notification.component';
import { XAlertModule } from '@ng-nest/ui/alert';
import { XPortalModule } from '@ng-nest/ui/portal';
import { XNotificationServiceModule } from './notification.service.module';

@NgModule({
  declarations: [XNotificationComponent],
  exports: [XNotificationComponent],
  entryComponents: [XNotificationComponent],
  imports: [CommonModule, XPortalModule, XAlertModule, XNotificationServiceModule]
})
export class XNotificationModule {}
