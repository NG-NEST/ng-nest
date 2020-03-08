import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XDrawerComponent } from './drawer.component';
import { XOutletModule } from '@ng-nest/ui/outlet';
import { XButtonModule } from '@ng-nest/ui/button';
import { XPortalModule } from '@ng-nest/ui/portal';

@NgModule({
  declarations: [XDrawerComponent],
  exports: [XDrawerComponent],
  imports: [CommonModule, XOutletModule, XButtonModule, XPortalModule]
})
export class XDrawerModule {}
