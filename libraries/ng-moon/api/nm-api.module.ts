import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NmApiComponent } from "./nm-api.component";

@NgModule({
  declarations: [NmApiComponent],
  exports: [NmApiComponent],
  imports: [CommonModule]
})
export class NmApiModule {}
