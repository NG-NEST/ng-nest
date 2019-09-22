import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NmExamplesComponent } from "./nm-examples.component";

@NgModule({
  declarations: [NmExamplesComponent],
  exports: [NmExamplesComponent],
  imports: [CommonModule]
})
export class NmExamplesModule {}
