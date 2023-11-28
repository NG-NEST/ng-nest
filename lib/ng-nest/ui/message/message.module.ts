import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XMessageComponent } from './message.component';
import { XAlertComponent } from '@ng-nest/ui/alert';
import { XMessageService } from './message.service';

@NgModule({
  declarations: [XMessageComponent],
  exports: [XMessageComponent],
  imports: [CommonModule, XAlertComponent],
  providers: [XMessageService]
})
export class XMessageModule {}
