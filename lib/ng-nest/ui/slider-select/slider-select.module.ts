import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { XSliderSelectComponent } from "./slider-select.component";
import { XTooltipModule } from "@ng-nest/ui/tooltip";
import { DragDropModule } from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [XSliderSelectComponent],
  exports: [XSliderSelectComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DragDropModule, XTooltipModule]
})
export class XSliderSelectModule {}
