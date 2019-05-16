import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NsDocsMessageComponent } from "./docs-message.component";
import { NsDocsMessageRoutesModule } from "./docs-message-routes.module";

@NgModule({
  imports: [CommonModule, NsDocsMessageRoutesModule],
  declarations: [NsDocsMessageComponent],
  exports: [NsDocsMessageComponent]
})
export class NsDocsMessageModule {}
