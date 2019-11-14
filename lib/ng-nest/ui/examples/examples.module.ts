import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { XExamplesComponent } from "./examples.component";

@NgModule({
  declarations: [XExamplesComponent],
  exports: [XExamplesComponent],
  imports: [CommonModule]
})
export class XExamplesModule {}
