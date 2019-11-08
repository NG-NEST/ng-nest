import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NuPatternComponent } from "./nu-pattern.component";

@NgModule({
  declarations: [NuPatternComponent],
  exports: [NuPatternComponent],
  imports: [CommonModule]
})
export class NuPatternModule {}
