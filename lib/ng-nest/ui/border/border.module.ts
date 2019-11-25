import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { XBorderComponent } from "./border.component";

@NgModule({
  declarations: [XBorderComponent],
  exports: [XBorderComponent],
  imports: [CommonModule]
})
export class XBorderModule {}
