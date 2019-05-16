import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NsDocsSelectComponent } from "./docs-select.component";
import { NsDocsSelectRoutesModule } from "./docs-select-routes.module";

@NgModule({
  imports: [CommonModule, NsDocsSelectRoutesModule],
  declarations: [NsDocsSelectComponent],
  exports: [NsDocsSelectComponent]
})
export class NsDocsSelectModule {}
