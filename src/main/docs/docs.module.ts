import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DocsComponent } from "./docs.component";
import { DocsRoutesModule } from "./docs-routes.module";
import { ShareModule } from "src/share/share.module";

@NgModule({
  imports: [CommonModule, DocsRoutesModule, ShareModule],
  declarations: [DocsComponent],
  exports: [DocsComponent]
})
export class DocsModule {}
