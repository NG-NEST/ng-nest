import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { XLinkComponent } from "./link.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [XLinkComponent],
  exports: [XLinkComponent],
  imports: [CommonModule, FormsModule]
})
export class XLinkModule {}
