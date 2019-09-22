import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NmPatternComponent } from "./nm-pattern.component";

@NgModule({
  declarations: [NmPatternComponent],
  exports: [NmPatternComponent],
  imports: [CommonModule]
})
export class NmPatternModule {}
