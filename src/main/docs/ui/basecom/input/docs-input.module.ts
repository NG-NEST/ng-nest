import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NsDocsInputComponent } from "./docs-input.component";
import { NsDocsInputRoutesModule } from "./docs-input-routes.module";

@NgModule({
  imports: [CommonModule, NsDocsInputRoutesModule],
  declarations: [NsDocsInputComponent],
  exports: [NsDocsInputComponent]
})
export class NsDocsInputModule {}
