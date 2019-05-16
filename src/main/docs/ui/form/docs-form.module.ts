import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NsDocsFormComponent } from "./docs-form.component";
import { NsDocsFormRoutesModule } from "./docs-form-routes.module";

@NgModule({
  imports: [CommonModule, NsDocsFormRoutesModule],
  declarations: [NsDocsFormComponent],
  exports: [NsDocsFormComponent]
})
export class NsDocsFormModule {}
