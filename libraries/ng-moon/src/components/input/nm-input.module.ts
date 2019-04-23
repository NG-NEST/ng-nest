import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NmInputComponent } from "./nm-input.component";

@NgModule({
  declarations: [NmInputComponent],
  exports: [NmInputComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class NmInputModule {}
