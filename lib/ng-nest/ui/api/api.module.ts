import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XApiComponent } from './api.component';

@NgModule({
  declarations: [XApiComponent],
  exports: [XApiComponent],
  imports: [CommonModule]
})
export class XApiModule {}
