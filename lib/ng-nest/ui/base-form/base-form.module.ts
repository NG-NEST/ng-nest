import { NgModule } from '@angular/core';
import { XControlValueAccessor } from './base-form.component';

@NgModule({
  imports: [XControlValueAccessor],
  exports: [XControlValueAccessor]
})
export class XBaseFormModule {}
