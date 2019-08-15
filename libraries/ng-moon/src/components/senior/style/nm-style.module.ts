import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NmStyleComponent } from "./nm-style.component";

@NgModule({
  declarations: [NmStyleComponent],
  exports: [NmStyleComponent],
  imports: [CommonModule]
})
export class NmStyleModule {}
