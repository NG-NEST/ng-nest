import { ShareModule } from 'src/share/share.module';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NsDocsGuideComponent } from "./docs-guide.component";
import { NsDocsGuideRoutesModule } from "./docs-guide-routes.module";

@NgModule({
  imports: [CommonModule, ShareModule, NsDocsGuideRoutesModule],
  declarations: [NsDocsGuideComponent],
  exports: [NsDocsGuideComponent]
})
export class NsDocsGuideModule {}
