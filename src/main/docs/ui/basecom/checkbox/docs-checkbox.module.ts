import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NsDocsCheckboxComponent } from "./docs-checkbox.component";
import { NsDocsCheckboxRoutesModule } from "./docs-checkbox-routes.module";

@NgModule({
  imports: [CommonModule, NsDocsCheckboxRoutesModule],
  declarations: [NsDocsCheckboxComponent],
  exports: [NsDocsCheckboxComponent]
})
export class NsDocsCheckboxModule {}
