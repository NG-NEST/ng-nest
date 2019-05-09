import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NmAnchorComponent } from "./nm-anchor.component";
import { NmSliderModule } from "../slider";
import { NmIconModule } from "../icon";

@NgModule({
  declarations: [NmAnchorComponent],
  exports: [NmAnchorComponent],
  imports: [CommonModule, NmSliderModule, NmIconModule]
})
export class NmAnchorModule {}
