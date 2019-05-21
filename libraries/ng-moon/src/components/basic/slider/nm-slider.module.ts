import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NmSliderComponent } from "./nm-slider.component";

@NgModule({
  declarations: [NmSliderComponent],
  exports: [NmSliderComponent],
  imports: [CommonModule]
})
export class NmSliderModule {}
