import { NgModule } from '@angular/core';
import { XIconComponent } from './icon.component';
import { XIconService } from './icon.service';

@NgModule({
  exports: [XIconComponent],
  imports: [XIconComponent],
  providers: [XIconService]
})
export class XIconModule {}
