import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NmIconComponent } from "./nm-icon.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [NmIconComponent],
  exports: [NmIconComponent],
  imports: [CommonModule, HttpClientModule]
})
export class NmIconModule {}
