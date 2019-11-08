import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NuHighlightComponent } from "./nu-highlight.component";

@NgModule({
  declarations: [NuHighlightComponent],
  exports: [NuHighlightComponent],
  imports: [CommonModule]
})
export class NuHighlightModule {}
