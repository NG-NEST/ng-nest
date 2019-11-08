import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NuIconComponent } from "./nu-icon.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [NuIconComponent],
  exports: [NuIconComponent],
  imports: [CommonModule, HttpClientModule]
})
export class NuIconModule {}
