import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { XDocComponent } from "./doc.component";

@NgModule({
  declarations: [XDocComponent],
  exports: [XDocComponent],
  imports: [CommonModule]
})
export class XDocModule {}
