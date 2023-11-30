import { NgModule } from '@angular/core';
import { XFormComponent } from './form.component';
import { XControlComponent } from './control.component';

@NgModule({
  exports: [XFormComponent, XControlComponent],
  imports: [XFormComponent, XControlComponent]
})
export class XFormModule {}
