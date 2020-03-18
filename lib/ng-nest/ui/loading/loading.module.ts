import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XLoadingComponent } from './loading.component';
import { XIconModule } from '@ng-nest/ui/icon';
import { XOutletModule } from '@ng-nest/ui/outlet';
import { XPortalModule } from '@ng-nest/ui/portal';

@NgModule({
  declarations: [XLoadingComponent],
  exports: [XLoadingComponent],
  imports: [CommonModule, XIconModule, XOutletModule, XPortalModule]
})
export class XLoadingModule {}
