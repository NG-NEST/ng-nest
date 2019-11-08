import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NuExamplesComponent } from "./nu-examples.component";

@NgModule({
  declarations: [NuExamplesComponent],
  exports: [NuExamplesComponent],
  imports: [CommonModule]
})
export class NuExamplesModule {}
