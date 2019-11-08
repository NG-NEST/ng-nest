import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NuApiComponent } from "./nu-api.component";

@NgModule({
  declarations: [NuApiComponent],
  exports: [NuApiComponent],
  imports: [CommonModule]
})
export class NuApiModule {}
