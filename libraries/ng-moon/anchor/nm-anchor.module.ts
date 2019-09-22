import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NmAnchorComponent } from "./nm-anchor.component";
import { NmSliderModule } from "ng-moon/slider";
import { NmIconModule } from "ng-moon/icon";

@NgModule({
  declarations: [NmAnchorComponent],
  exports: [NmAnchorComponent],
  imports: [CommonModule, NmSliderModule, NmIconModule]
})
export class NmAnchorModule {}
