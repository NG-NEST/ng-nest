import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NmAnchorComponent } from "./nm-anchor.component";
import { NmSliderModule } from "../slider/nm-slider.module";
import { NmIconModule } from "../icon/nm-icon.module";

@NgModule({
  declarations: [NmAnchorComponent],
  exports: [NmAnchorComponent],
  imports: [CommonModule, NmSliderModule, NmIconModule]
})
export class NmAnchorModule {}
