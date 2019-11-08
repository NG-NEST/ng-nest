import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NuInputComponent } from "./nu-input.component";
import { NuIconModule } from "@ng-nest/ui/icon";

@NgModule({
  declarations: [NuInputComponent],
  exports: [NuInputComponent],
  imports: [CommonModule, NuIconModule, FormsModule, ReactiveFormsModule]
})
export class NuInputModule {}
