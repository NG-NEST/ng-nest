import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { XInputSliderComponent } from "./input-slider.component";
import { XButtonModule } from "@ng-nest/ui/button";

@NgModule({
  declarations: [XInputSliderComponent],
  exports: [XInputSliderComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, XButtonModule]
})
export class XInputSliderModule {}
