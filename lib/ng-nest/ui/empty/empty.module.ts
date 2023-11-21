import { NgModule } from '@angular/core';
import { XEmptyComponent } from './empty.component';

@NgModule({
  exports: [XEmptyComponent],
  imports: [XEmptyComponent]
})
export class XEmptyModule {}
