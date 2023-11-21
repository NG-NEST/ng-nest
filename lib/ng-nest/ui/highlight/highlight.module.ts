import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XHighlightComponent } from './highlight.component';
import { XHighlightProperty } from './highlight.property';
import { XButtonComponent } from '@ng-nest/ui/button';

@NgModule({
  declarations: [XHighlightComponent, XHighlightProperty],
  exports: [XHighlightComponent],
  imports: [CommonModule, XButtonComponent]
})
export class XHighlightModule {}
