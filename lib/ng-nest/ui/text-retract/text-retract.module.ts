import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XTextRetractComponent } from './text-retract.component';
import { FormsModule } from '@angular/forms';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XTextRetractProperty } from './text-retract.property';
import { XI18nPipe } from '@ng-nest/ui/i18n';

@NgModule({
  declarations: [XTextRetractComponent, XTextRetractProperty],
  exports: [XTextRetractComponent],
  imports: [CommonModule, FormsModule, XLinkComponent, XI18nPipe]
})
export class XTextRetractModule {}
