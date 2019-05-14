import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NsDocsLoadingComponent } from "./docs-loading.component";
import { NsDocsLoadingRoutesModule } from "./docs-loading-routes.module";

@NgModule({
  imports: [CommonModule, NsDocsLoadingRoutesModule],
  declarations: [NsDocsLoadingComponent],
  exports: [NsDocsLoadingComponent]
})
export class NsDocsLoadingModule {}
