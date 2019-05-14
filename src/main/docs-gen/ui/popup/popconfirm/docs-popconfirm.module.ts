import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NsDocsPopconfirmComponent } from "./docs-popconfirm.component";
import { NsDocsPopconfirmRoutesModule } from "./docs-popconfirm-routes.module";

@NgModule({
  imports: [CommonModule, NsDocsPopconfirmRoutesModule],
  declarations: [NsDocsPopconfirmComponent],
  exports: [NsDocsPopconfirmComponent]
})
export class NsDocsPopconfirmModule {}
