import { NmInputModule } from "./../../combination/input/nm-input.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NmFormComponent } from "./nm-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NmGridModule } from "../../basic/grid/nm-grid.module";
import { NmControlComponent } from "./nm-control.component";

@NgModule({
  declarations: [NmFormComponent, NmControlComponent],
  exports: [NmFormComponent, NmControlComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NmInputModule,
    NmGridModule
  ]
})
export class NmFormModule {}
