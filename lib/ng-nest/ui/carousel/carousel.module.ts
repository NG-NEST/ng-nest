import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XCarouselComponent } from './carousel.component';
import { XCarouselPanelComponent } from './carousel-panel.component';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XCarouselProperty, XCarouselPanelProperty } from './carousel.property';
import { XProgressModule } from '@ng-nest/ui/progress';

@NgModule({
  declarations: [XCarouselComponent, XCarouselPanelComponent, XCarouselProperty, XCarouselPanelProperty],
  exports: [XCarouselComponent, XCarouselPanelComponent],
  imports: [CommonModule, XButtonComponent, XProgressModule]
})
export class XCarouselModule {}
