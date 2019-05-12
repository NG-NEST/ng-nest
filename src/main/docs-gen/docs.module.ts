import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NsDocsComponent } from "./docs.component";
import { NsDocsRoutesModule } from "./docs-routes.module";
{{ __imports }}
@NgModule({
  imports: [CommonModule, NsDocsRoutesModule{{ __custom }}],
  declarations: [NsDocsComponent],
  exports: [NsDocsComponent]
})
export class NsDocsModule {}
