import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XTextRetractComponent } from './text-retract.component';
import { FormsModule } from '@angular/forms';
import { XLinkModule } from '@ng-nest/ui/link';
import { XTextRetractProperty } from './text-retract.property';

@NgModule({
  declarations: [XTextRetractComponent, XTextRetractProperty],
  exports: [XTextRetractComponent],
  imports: [CommonModule, FormsModule, XLinkModule]
})
export class XTextRetractModule {}
