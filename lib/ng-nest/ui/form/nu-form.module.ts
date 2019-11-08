import { NuInputModule } from "@ng-nest/ui/input";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NuFormComponent } from "./nu-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NuGridModule } from "@ng-nest/ui/grid";
import { NuControlComponent } from "./nu-control.component";

@NgModule({
  declarations: [NuFormComponent, NuControlComponent],
  exports: [NuFormComponent, NuControlComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NuInputModule,
    NuGridModule
  ]
})
export class NuFormModule {}
