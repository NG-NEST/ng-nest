import { NgModule } from '@angular/core';
import { XCarouselComponent } from './carousel.component';
import { XCarouselPanelComponent } from './carousel-panel.component';

@NgModule({
  imports: [XCarouselComponent, XCarouselPanelComponent],
  exports: [XCarouselComponent, XCarouselPanelComponent]
})
export class XCarouselModule {}
