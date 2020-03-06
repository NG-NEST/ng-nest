import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XIconComponent } from './icon.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [XIconComponent],
  exports: [XIconComponent],
  imports: [CommonModule, HttpClientModule]
})
export class XIconModule {}
