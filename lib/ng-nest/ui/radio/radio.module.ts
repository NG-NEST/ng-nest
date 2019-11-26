import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { XRadioComponent } from "./radio.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [XRadioComponent],
  exports: [XRadioComponent],
  imports: [CommonModule, FormsModule]
})
export class XRadioModule {}
