import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NsDocsModalComponent } from "./docs-modal.component";
import { NsDocsModalRoutesModule } from "./docs-modal-routes.module";

@NgModule({
  imports: [CommonModule, NsDocsModalRoutesModule],
  declarations: [NsDocsModalComponent],
  exports: [NsDocsModalComponent]
})
export class NsDocsModalModule {}
