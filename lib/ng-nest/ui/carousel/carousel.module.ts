import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { XCarouselComponent } from "./carousel.component";
import { XCarouselPanelComponent } from "./carousel-panel.component";
import { XIconModule } from "@ng-nest/ui/icon";
import { XButtonModule } from "@ng-nest/ui/button";

@NgModule({
  declarations: [XCarouselComponent, XCarouselPanelComponent],
  exports: [XCarouselComponent, XCarouselPanelComponent],
  imports: [CommonModule, XIconModule, XButtonModule]
})
export class XCarouselModule {}
