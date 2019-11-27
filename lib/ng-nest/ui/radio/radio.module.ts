import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { XRadioComponent } from "./radio.component";
import { FormsModule } from "@angular/forms";
import { XRadiosComponent } from "./radios.component";

@NgModule({
  declarations: [XRadiosComponent, XRadioComponent],
  exports: [XRadiosComponent, XRadioComponent],
  imports: [CommonModule, FormsModule]
})
export class XRadioModule {}
