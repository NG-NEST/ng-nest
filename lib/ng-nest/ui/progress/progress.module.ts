import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XProgressComponent } from './progress.component';
import { FormsModule } from '@angular/forms';
import { XIconModule } from '@ng-nest/ui/icon';

@NgModule({
  declarations: [XProgressComponent],
  exports: [XProgressComponent],
  imports: [CommonModule, FormsModule, XIconModule]
})
export class XProgressModule {}
