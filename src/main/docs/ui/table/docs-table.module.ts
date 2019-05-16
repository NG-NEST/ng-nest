import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NsDocsTableComponent } from "./docs-table.component";
import { NsDocsTableRoutesModule } from "./docs-table-routes.module";

@NgModule({
  imports: [CommonModule, NsDocsTableRoutesModule],
  declarations: [NsDocsTableComponent],
  exports: [NsDocsTableComponent]
})
export class NsDocsTableModule {}
