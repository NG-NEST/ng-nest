import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NsDocsDatetimeComponent } from "./docs-datetime.component";
import { NsDocsDatetimeRoutesModule } from "./docs-datetime-routes.module";

@NgModule({
  imports: [CommonModule, NsDocsDatetimeRoutesModule],
  declarations: [NsDocsDatetimeComponent],
  exports: [NsDocsDatetimeComponent]
})
export class NsDocsDatetimeModule {}
