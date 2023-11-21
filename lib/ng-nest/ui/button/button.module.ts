import { NgModule } from '@angular/core';
import { XButtonComponent } from './button.component';
import { XButtonsComponent } from './buttons.component';

@NgModule({
  exports: [XButtonComponent, XButtonsComponent],
  imports: [XButtonComponent, XButtonsComponent]
})
export class XButtonModule {}
