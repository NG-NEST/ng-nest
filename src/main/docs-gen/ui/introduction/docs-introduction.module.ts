import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NsDocsIntroductionComponent } from "./docs-introduction.component";
import { NsDocsIntroductionRoutesModule } from "./docs-introduction-routes.module";

@NgModule({
  imports: [CommonModule, NsDocsIntroductionRoutesModule],
  declarations: [NsDocsIntroductionComponent],
  exports: [NsDocsIntroductionComponent]
})
export class NsDocsIntroductionModule {}
