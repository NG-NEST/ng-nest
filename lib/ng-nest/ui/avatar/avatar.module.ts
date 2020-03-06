import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XAvatarComponent } from './avatar.component';
import { FormsModule } from '@angular/forms';
import { XIconModule } from '@ng-nest/ui/icon';

@NgModule({
  declarations: [XAvatarComponent],
  exports: [XAvatarComponent],
  imports: [CommonModule, FormsModule, XIconModule]
})
export class XAvatarModule {}
