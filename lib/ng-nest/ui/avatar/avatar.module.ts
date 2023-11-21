import { NgModule } from '@angular/core';
import { XAvatarComponent } from './avatar.component';
import { XAvatarGroupComponent } from './avatar-group.component';

@NgModule({
  exports: [XAvatarComponent, XAvatarGroupComponent],
  imports: [XAvatarComponent, XAvatarGroupComponent]
})
export class XAvatarModule {}
