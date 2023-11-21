import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XProgressComponent } from './progress.component';
import { FormsModule } from '@angular/forms';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XProgressProperty } from './progress.property';

@NgModule({
  declarations: [XProgressComponent, XProgressProperty],
  exports: [XProgressComponent],
  imports: [CommonModule, FormsModule, XIconComponent]
})
export class XProgressModule {}
