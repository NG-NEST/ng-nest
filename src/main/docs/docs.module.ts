import { ShareModule } from 'src/share/share.module';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NsDocsComponent } from "./docs.component";
import { NsDocsRoutesModule } from "./docs-routes.module";

@NgModule({
  imports: [CommonModule, ShareModule, NsDocsRoutesModule],
  declarations: [NsDocsComponent],
  exports: [NsDocsComponent]
})
export class NsDocsModule {}
