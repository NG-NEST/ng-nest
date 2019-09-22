import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NmHighlightComponent } from "./nm-highlight.component";

@NgModule({
  declarations: [NmHighlightComponent],
  exports: [NmHighlightComponent],
  imports: [CommonModule]
})
export class NmHighlightModule {}
