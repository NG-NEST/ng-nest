import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NsDocsAlertComponent } from "./docs-alert.component";
import { NsDocsAlertRoutesModule } from "./docs-alert-routes.module";

@NgModule({
  imports: [CommonModule, NsDocsAlertRoutesModule],
  declarations: [NsDocsAlertComponent],
  exports: [NsDocsAlertComponent]
})
export class NsDocsAlertModule {}
