import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NmDocComponent } from "./nm-doc.component";

@NgModule({
  declarations: [NmDocComponent],
  exports: [NmDocComponent],
  imports: [CommonModule]
})
export class NmDocModule {}
