import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XHighlightComponent } from './highlight.component';

@NgModule({
  declarations: [XHighlightComponent],
  exports: [XHighlightComponent],
  imports: [CommonModule]
})
export class XHighlightModule {}
