import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XNotificationComponent } from './notification.component';
import { XAlertComponent } from '@ng-nest/ui/alert';
import { XNotificationService } from './notification.service';

@NgModule({
  declarations: [XNotificationComponent],
  exports: [XNotificationComponent],
  imports: [CommonModule, XAlertComponent],
  providers: [XNotificationService]
})
export class XNotificationModule {}
