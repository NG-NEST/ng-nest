import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XCarouselComponent } from './carousel.component';
import { XCarouselPanelComponent } from './carousel-panel.component';
import { XButtonModule } from '@ng-nest/ui/button';
import { XCarouselProperty, XCarouselPanelProperty } from './carousel.property';

@NgModule({
  declarations: [XCarouselComponent, XCarouselPanelComponent, XCarouselProperty, XCarouselPanelProperty],
  exports: [XCarouselComponent, XCarouselPanelComponent],
  imports: [CommonModule, XButtonModule]
})
export class XCarouselModule {}
