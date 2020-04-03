import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XMessageComponent } from './message.component';
import { XAlertModule } from '@ng-nest/ui/alert';
import { XMessageService } from './message.service';
import { XPortalModule } from '@ng-nest/ui/portal';

@NgModule({
  declarations: [XMessageComponent],
  exports: [XMessageComponent],
  imports: [CommonModule, XPortalModule, XAlertModule],
  providers: [XMessageService]
})
export class XMessageModule {}
