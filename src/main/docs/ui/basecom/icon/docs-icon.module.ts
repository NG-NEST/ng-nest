import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NsDocsIconComponent } from "./docs-icon.component";
import { NsDocsIconRoutesModule } from "./docs-icon-routes.module";

@NgModule({
  imports: [CommonModule, NsDocsIconRoutesModule],
  declarations: [NsDocsIconComponent],
  exports: [NsDocsIconComponent]
})
export class NsDocsIconModule {}
