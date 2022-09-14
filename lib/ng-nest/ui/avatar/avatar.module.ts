import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XAvatarComponent } from './avatar.component';
import { XIconModule } from '@ng-nest/ui/icon';
import { XOutletModule } from '@ng-nest/ui/outlet';
import { XAvatarGroupProperty, XAvatarProperty } from './avatar.property';
import { XAvatarGroupComponent } from './avatar-group.component';

@NgModule({
  declarations: [XAvatarComponent, XAvatarProperty, XAvatarGroupComponent, XAvatarGroupProperty],
  exports: [XAvatarComponent, XAvatarGroupComponent],
  imports: [CommonModule, XOutletModule, XIconModule]
})
export class XAvatarModule {}
