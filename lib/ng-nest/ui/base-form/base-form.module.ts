import { NgModule } from '@angular/core';
import { XControlValueAccessor } from './base-form.component';
import { XFormProp } from './base-form.property';

@NgModule({
  declarations: [XControlValueAccessor, XFormProp],
  exports: [XControlValueAccessor, XFormProp]
})
export class XBaseFormModule {}
