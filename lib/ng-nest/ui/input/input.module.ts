import { NgModule } from '@angular/core';
import { XInputComponent } from './input.component';
import { XInputGroupComponent } from './input-group.component';
@NgModule({
  exports: [XInputComponent, XInputGroupComponent],
  imports: [XInputComponent, XInputGroupComponent]
})
export class XInputModule {}
