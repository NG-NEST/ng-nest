import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XAvatarComponent } from './avatar.component';
import { XIconModule } from '@ng-nest/ui/icon';
import { XOutletModule } from '@ng-nest/ui/outlet';
import { XAvatarProperty } from './avatar.property';

@NgModule({
  declarations: [XAvatarComponent, XAvatarProperty],
  exports: [XAvatarComponent],
  imports: [CommonModule, XOutletModule, XIconModule]
})
export class XAvatarModule {}
