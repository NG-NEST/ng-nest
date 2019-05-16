import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NsDocsRadioComponent } from "./docs-radio.component";
import { NsDocsRadioRoutesModule } from "./docs-radio-routes.module";

@NgModule({
  imports: [CommonModule, NsDocsRadioRoutesModule],
  declarations: [NsDocsRadioComponent],
  exports: [NsDocsRadioComponent]
})
export class NsDocsRadioModule {}
