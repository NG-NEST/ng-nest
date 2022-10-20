import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XHighlightComponent } from './highlight.component';
import { XHighlightProperty } from './highlight.property';
import { XButtonModule } from '@ng-nest/ui/button';

@NgModule({
  declarations: [XHighlightComponent, XHighlightProperty],
  exports: [XHighlightComponent],
  imports: [CommonModule, XButtonModule]
})
export class XHighlightModule {}
