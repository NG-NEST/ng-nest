import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { XPatternComponent } from "./pattern.component";

@NgModule({
  declarations: [XPatternComponent],
  exports: [XPatternComponent],
  imports: [CommonModule]
})
export class XPatternModule {}
