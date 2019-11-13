import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NuColorComponent } from "./nu-color.component";

@NgModule({
  declarations: [NuColorComponent],
  exports: [NuColorComponent],
  imports: [CommonModule]
})
export class NuColorModule {}
