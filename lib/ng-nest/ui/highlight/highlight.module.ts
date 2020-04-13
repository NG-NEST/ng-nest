import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XHighlightComponent } from './highlight.component';
import { XHighlightProperty } from './highlight.property';

@NgModule({
  declarations: [XHighlightComponent, XHighlightProperty],
  exports: [XHighlightComponent],
  imports: [CommonModule]
})
export class XHighlightModule {}
