import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XButtonComponent } from './button.component';
import { XIconModule } from '@ng-nest/ui/icon';
import { XButtonsComponent } from './buttons.component';

@NgModule({
  declarations: [XButtonComponent, XButtonsComponent],
  exports: [XButtonComponent, XButtonsComponent],
  imports: [CommonModule, XIconModule]
})
export class XButtonModule {}
