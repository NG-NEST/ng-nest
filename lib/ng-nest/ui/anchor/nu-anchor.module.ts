import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NuAnchorComponent } from "./nu-anchor.component";
import { NuSliderModule } from "@ng-nest/ui/slider";
import { NuIconModule } from "@ng-nest/ui/icon";

@NgModule({
  declarations: [NuAnchorComponent],
  exports: [NuAnchorComponent],
  imports: [CommonModule, NuSliderModule, NuIconModule]
})
export class NuAnchorModule {}
