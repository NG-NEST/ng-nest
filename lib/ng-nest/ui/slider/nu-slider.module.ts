import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NuSliderComponent } from "./nu-slider.component";

@NgModule({
  declarations: [NuSliderComponent],
  exports: [NuSliderComponent],
  imports: [CommonModule]
})
export class NuSliderModule {}
