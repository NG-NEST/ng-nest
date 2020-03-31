import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XNotificationComponent } from './notification.component';
import { XAlertModule } from '@ng-nest/ui/alert';
import { XNotificationServiceModule } from './notification.service.module';

@NgModule({
  declarations: [XNotificationComponent],
  exports: [XNotificationComponent],
  imports: [CommonModule, XAlertModule, XNotificationServiceModule]
})
export class XNotificationModule {}
