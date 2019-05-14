import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NsDocsTreeComponent } from "./docs-tree.component";
import { NsDocsTreeRoutesModule } from "./docs-tree-routes.module";

@NgModule({
  imports: [CommonModule, NsDocsTreeRoutesModule],
  declarations: [NsDocsTreeComponent],
  exports: [NsDocsTreeComponent]
})
export class NsDocsTreeModule {}
