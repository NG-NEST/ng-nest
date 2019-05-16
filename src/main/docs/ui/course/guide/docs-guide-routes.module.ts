import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NsDocsGuideComponent } from "./docs-guide.component";

const routes: Routes = [
  {
    path: "",
    component: NsDocsGuideComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsDocsGuideRoutesModule {}
