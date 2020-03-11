import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XMessageComponent } from './message.component';
import { XAlertModule } from '@ng-nest/ui/alert';
import { XPortalModule } from '@ng-nest/ui/portal';
import { XMessageServiceModule } from './message.service.module';

@NgModule({
  declarations: [XMessageComponent],
  exports: [XMessageComponent],
  entryComponents: [XMessageComponent],
  imports: [CommonModule, XPortalModule, XAlertModule, XMessageServiceModule]
})
export class XMessageModule {}
