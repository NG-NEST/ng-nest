import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { XInputComponent } from "./input.component";
import { XIconModule } from "@ng-nest/ui/icon";

@NgModule({
  declarations: [XInputComponent],
  exports: [XInputComponent],
  imports: [CommonModule, XIconModule, FormsModule, ReactiveFormsModule]
})
export class XInputModule {}
