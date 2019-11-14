import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { XAnchorComponent } from "./anchor.component";
import { XSliderModule } from "@ng-nest/ui/slider";
import { XIconModule } from "@ng-nest/ui/icon";

@NgModule({
  declarations: [XAnchorComponent],
  exports: [XAnchorComponent],
  imports: [CommonModule, XSliderModule, XIconModule]
})
export class XAnchorModule {}
