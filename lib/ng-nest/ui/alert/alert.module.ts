import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XAlertComponent } from './alert.component';
import { XIconModule } from '@ng-nest/ui/icon';
import { XOutletModule } from '@ng-nest/ui/outlet';
import { XButtonModule } from '@ng-nest/ui/button';

@NgModule({
  declarations: [XAlertComponent],
  exports: [XAlertComponent],
  imports: [CommonModule, XIconModule, XButtonModule, XOutletModule]
})
export class XAlertModule {}
