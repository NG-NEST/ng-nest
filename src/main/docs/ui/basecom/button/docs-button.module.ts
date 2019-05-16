import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NsDocsButtonComponent } from "./docs-button.component";
import { NsDocsButtonRoutesModule } from "./docs-button-routes.module";

@NgModule({
  imports: [CommonModule, NsDocsButtonRoutesModule],
  declarations: [NsDocsButtonComponent],
  exports: [NsDocsButtonComponent]
})
export class NsDocsButtonModule {}
